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
	import { goto, preloadData } from '$app/navigation';

	type Catalogue = {
		catalogue_id: number;
		package_name: string;
		description: string;
		price: number;
		status_publish: string;
		image: string; // base64 image
		created_at: string;
		updated_at: string | null;
	};

	let catalogues: Catalogue[] = [];
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

	// Detail modal state
	let showDetail = false;
	let selectedCatalogue: Catalogue | null = null;

	function openCatalogue(catalogue: Catalogue) {
		selectedCatalogue = catalogue;
		showDetail = true;
		// goto(`/catalogues/${catalogue.catalogue_id}`, { replaceState: false });
        history.pushState({}, '', `/catalogues/${catalogue.catalogue_id}`);
	}

	function closeDetail() {
		showDetail = false;
		selectedCatalogue = null;
		goto('/catalogues', { replaceState: false });
        history.pushState({}, '', '/catalogues');
	}

	// Load catalogues
	let authHeaders = { Authorization: `Bearer ${token}` };

	async function fetchCatalogues() {
		loading = true;
		try {
			const { data } = await axios.get('http://localhost:3000/catalogues', {
				headers: authHeaders
			});
			if (data.success) {
				catalogues = data.catalogues;
			} else {
				errorMessage = data.message || 'Failed to fetch catalogues';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Error fetching catalogues';
		} finally {
			loading = false;
		}
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
				console.log(payload.image);
				await axios.put(`http://localhost:3000/catalogues/${selectedId}`, payload, {
					headers: authHeaders
				});
			} else {
				console.log(payload.image);
				await axios.post('http://localhost:3000/catalogues', payload, {
					headers: authHeaders
				});
			}

			await fetchCatalogues();
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
			await fetchCatalogues();
		} catch (err) {
			console.error(err);
			alert('Failed to delete catalogue');
		}
	}

	function editCatalogue(catalogue: Catalogue) {
		isEditing = true;
		selectedId = catalogue.catalogue_id;
		package_name = catalogue.package_name;
		description = catalogue.description;
		price = catalogue.price;
		status_publish = catalogue.status_publish;
		imageBase64 = catalogue.image;
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

	onMount(() => {
		token = localStorage.getItem('token')!;
		authHeaders = { Authorization: `Bearer ${token}` };
		isLoggedIn = !!token;
		fetchCatalogues();
	});
</script>

<div class="min-h-screen  px-6 py-8 ">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Catalogue</h1>

		{#if isLoggedIn}
			<Button
				onclick={() => {
					resetForm();
					showForm = true;
				}}>+ New Catalogue</Button
			>
		{/if}
	</div>

	{#if loading}
		<p>Loading...</p>
	{:else if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{:else if catalogues.length === 0}
		<p>No catalogues available.</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each catalogues as catalogue}
				<Card class="shadow-md">
					<CardHeader>
						<CardTitle>{catalogue.package_name}</CardTitle>
					</CardHeader>

					<CardContent>
						{#if catalogue.image}
							<img
								src={catalogue.image}
								alt={catalogue.package_name}
								class="mb-2 max-h-48 w-full rounded object-contain"
							/>
						{/if}
						<p>{catalogue.description}</p>
						<p class="font-bold">Rp. {catalogue.price.toLocaleString()}</p>
						<Button onclick={() => openCatalogue(catalogue)}>Details</Button>
					</CardContent>

					{#if isLoggedIn}
						<CardFooter class="flex justify-between">
							<Button size="sm" variant="outline" onclick={() => editCatalogue(catalogue)}
								>Edit</Button
							>
							<Button
								size="sm"
								variant="destructive"
								onclick={() => removeCatalogue(catalogue.catalogue_id)}>Delete</Button
							>
						</CardFooter>
					{/if}
				</Card>
			{/each}
		</div>
	{/if}
	<!-- Detail modal -->
	{#if showDetail && selectedCatalogue}
		<Dialog open={showDetail} onOpenChange={closeDetail}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{selectedCatalogue.package_name}</DialogTitle>
				</DialogHeader>

				{#if selectedCatalogue.image}
					<img
						src={selectedCatalogue.image}
						alt={selectedCatalogue.package_name}
						class="mb-2 max-h-48 w-full rounded object-contain"
					/>
				{/if}
				<p>{selectedCatalogue.description}</p>
				<p class="font-bold">Rp. {selectedCatalogue.price.toLocaleString()}</p>
				<Button onclick={()=>goto(`/catalogues/${selectedCatalogue!.catalogue_id}/order`)}>
					Order
				</Button>

				{#if isLoggedIn}
					<DialogFooter class="flex justify-between">
						<Button size="sm" variant="outline" onclick={() => editCatalogue(selectedCatalogue!)}
							>Edit</Button
						>
						<Button
							size="sm"
							variant="destructive"
							onclick={() => removeCatalogue(selectedCatalogue!.catalogue_id)}>Delete</Button
						>
					</DialogFooter>
				{/if}
			</DialogContent>
		</Dialog>
	{/if}

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
</div>
