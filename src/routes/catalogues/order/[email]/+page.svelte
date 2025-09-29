<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';

	type Order = {
		order_id: number;
		catalogue_id: number;
		name: string;
		email: string;
		phone_number: string;
		wedding_date: string;
		status: string;
		created_at: string;
	};

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

	type OrderWithCatalogue = Order & { catalogue?: Catalogue };

	let orders: OrderWithCatalogue[] = [];
	let loading = false;
	let errorMessage = '';

	let showDetail = false;
	let selectedCatalogue: Catalogue | null = null;

	const email = page.params.email;

	async function fetchOrdersAndCatalogues(email: string) {
		loading = true;
		errorMessage = '';
		try {
			const { data: ordersData } = await axios.get<{ success: boolean; orders: Order[] }>(
				`http://localhost:3000/orders/${encodeURIComponent(email)}`
			);

			if (!ordersData.success) {
				errorMessage = 'Failed to fetch orders';
				return;
			}

			const ordersWithCatalogue: OrderWithCatalogue[] = await Promise.all(
				ordersData.orders.map(async (order) => {
					try {
						const { data: catData } = await axios.get<{ success: boolean; catalogues: Catalogue }>(
							`http://localhost:3000/catalogues/${order.catalogue_id}`
						);
						if (catData.success) {
							return { ...order, catalogue: catData.catalogues };
						}
						return order;
					} catch {
						return order;
					}
				})
			);

			orders = ordersWithCatalogue;
		} catch (err) {
			console.error(err);
			errorMessage = 'Error fetching orders or catalogues';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchOrdersAndCatalogues(email!);
	});

	function openCatalogue(catalogue: Catalogue) {
		selectedCatalogue = catalogue;
		showDetail = true;
	}

	function closeDetail() {
		showDetail = false;
		selectedCatalogue = null;
	}
</script>

<div class="min-h-screen px-6 py-8">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Orders for {email}</h1>
	</div>

	{#if loading}
		<p>Loading...</p>
	{:else if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{:else if orders.length === 0}
		<p>No orders found for {email}.</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each orders as order}
				{#if order.catalogue}
					<Card class="shadow-md">
						<CardHeader>
							<CardTitle>Order #{order.order_id} - {order.status}</CardTitle>
						</CardHeader>

						<CardContent>
							{#if order.catalogue.image}
								<img
									src={order.catalogue.image}
									alt={order.catalogue.package_name}
									class="mb-2 max-h-48 w-full rounded object-contain"
								/>
							{/if}
							<p class="font-semibold">{order.catalogue.package_name}</p>
							<p class="truncate text-sm">{order.catalogue.description}</p>
							<p class="mt-1 font-bold">Rp. {order.catalogue.price.toLocaleString()}</p>
							<Button class="mt-2" onclick={() => openCatalogue(order.catalogue!)}>Details</Button>
						</CardContent>
					</Card>
				{/if}
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
				<p>Status: {selectedCatalogue.status_publish === 'Y' ? 'Published' : 'Draft'}</p>

				<Button class="mt-4" onclick={closeDetail}>Close</Button>
			</DialogContent>
		</Dialog>
	{/if}
</div>
