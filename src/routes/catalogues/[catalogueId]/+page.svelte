<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import axios from 'axios';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	type Catalogue = {
		catalogue_id: number;
		package_name: string;
		description: string;
		price: number;
		status_publish: string;
		image: string;
		created_at: string;
		updated_at: string | null;
	};

	let catalogue: Catalogue | null = null;
	let loading = true;
	let errorMessage = '';
	let token = '';
	let isLoggedIn = false;

	// Form state
	let isEditing = false;
	let showForm = false;

	let selectedId: number | null = null;

	let package_name = '';
	let description = '';
	let price: number = 0;
	let status_publish = 'Y';
	let imageBase64 = ''; // image in base64

	// Get ID from URL
	let catalogueId: number | null = null;

	catalogueId = Number(page.params.catalogueId);

	let authHeaders = { Authorization: `Bearer ${token}` };

	async function fetchCatalogue(id: number) {
		loading = true;
		try {
			const { data } = await axios.get(`http://localhost:3000/catalogues/${id}`, {
				headers: authHeaders
			});
			if (data.success) {
				catalogue = data.catalogues;
			} else {
				errorMessage = data.message || 'Failed to fetch catalogue';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Error fetching catalogue';
		} finally {
			loading = false;
		}
	}

	function editCatalogue(c: Catalogue) {
		isEditing = true;
		selectedId = c.catalogue_id;
		package_name = c.package_name;
		description = c.description;
		price = c.price;
		status_publish = c.status_publish;
		imageBase64 = c.image;
		showForm = true;
	}

	function resetForm() {
		isEditing = false;
		selectedId = null;
		package_name = '';
		description = '';
		price = 0;
		status_publish = 'Y';
		imageBase64 = '';
		showForm = false;
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files?.length) return;

		const file = target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			imageBase64 = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	async function saveCatalogue() {
		if (!package_name || !description || price <= 0) {
			alert('Please fill all fields correctly');
			return;
		}

		try {
			const payload = {
				package_name,
				description,
				price: Number(price),
				status_publish,
				image: imageBase64
			};

			if (isEditing && selectedId) {
				await axios.put(`http://localhost:3000/catalogues/${selectedId}`, payload, {
					headers: authHeaders
				});
			} else {
				await axios.post('http://localhost:3000/catalogues', payload, {
					headers: authHeaders
				});
			}

			if (catalogueId) await fetchCatalogue(catalogueId);
			resetForm();
		} catch (err) {
			console.error(err);
			alert('Failed to save catalogue');
		}
	}

	async function removeCatalogue(id: number) {
		if (!confirm('Are you sure you want to delete this catalogue?')) return;
		try {
			await axios.delete(`http://localhost:3000/catalogues/${id}`, {
				headers: authHeaders
			});
		} catch (err) {
			console.error(err);
			alert('Failed to delete catalogue');
		}
	}

	onMount(() => {
		token = localStorage.getItem('token')!;
		authHeaders = { Authorization: `Bearer ${token}` };
		isLoggedIn = !!token;
		if (catalogueId) fetchCatalogue(catalogueId);
	});
</script>

<Dialog open={true} onOpenChange={() => goto('/catalogues', { replaceState: false })}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>{catalogue?.package_name}</DialogTitle>
		</DialogHeader>
		{#if catalogue?.image}
			<img
				src={catalogue.image}
				alt={catalogue.package_name}
				class="mb-2 max-h-48 w-full rounded object-contain"
			/>
			<p class="mb-2 text-sm text-muted-foreground">{catalogue.description}</p>
			<p class="font-bold">Rp. {catalogue.price.toLocaleString()}</p>
			<Button onclick={() => goto(`/catalogues/${catalogue!.catalogue_id}/order`)}>Order</Button>
		{/if}
		{#if isLoggedIn}
			<DialogFooter class="flex justify-between">
				<Button size="sm" variant="outline" onclick={() => editCatalogue(catalogue!)}>Edit</Button>
				<Button
					size="sm"
					variant="destructive"
					onclick={() => removeCatalogue(catalogue!.catalogue_id)}>Delete</Button
				>
			</DialogFooter>
		{/if}
	</DialogContent>
</Dialog>

<!-- Modal Form -->
{#if showForm}
	<Dialog open={showForm} onOpenChange={resetForm}>
		<DialogContent class="sm:max-w-lg">
			<DialogHeader>
				<DialogTitle>{isEditing ? 'Edit Catalogue' : 'New Catalogue'}</DialogTitle>
			</DialogHeader>

			<div class="space-y-4">
				<div>
					<Label for="package_name">Package Name</Label>
					<Input id="package_name" bind:value={package_name} />
				</div>

				<div>
					<Label for="description">Description</Label>
					<Input id="description" bind:value={description} />
				</div>

				<div>
					<Label for="price">Price</Label>
					<Input id="price" type="number" bind:value={price} />
				</div>

				<div>
					<Label for="status_publish">Status</Label>
					<select
						id="status_publish"
						bind:value={status_publish}
						class="w-full rounded-md border p-2"
					>
						<option value="Y">Published</option>
						<option value="N">Draft</option>
					</select>
				</div>

				<div>
					<Label for="image">Upload Image</Label>
					<Input id="image" type="file" accept="image/*" onchange={handleFileChange} />
					{#if imageBase64}
						<img src={imageBase64} alt="Preview" class="mt-2 max-h-48 rounded object-contain" />
					{/if}
				</div>
			</div>

			<DialogFooter>
				<Button variant="outline" onclick={resetForm}>Cancel</Button>
				<Button onclick={saveCatalogue}>{isEditing ? 'Update' : 'Create'}</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
{/if}
