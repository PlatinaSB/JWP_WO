<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Calendar } from '$lib/components/ui/calendar';
	import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

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
	let loading = false;
	let errorMessage = '';
	let successMessage = '';

	const catalogueId = Number(page.params.catalogueId);

	let form = {
		name: '',
		email: '',
		phone_number: '',
		wedding_date: '' // ISO string
	};

	let calendarValue: CalendarDate | undefined;
	let open = false;

	function handleCalendarChange(value: DateValue | undefined) {
		// Only proceed if value is CalendarDate (ignore CalendarDateTime)
		if (value && value instanceof CalendarDate) {
			calendarValue = value;
			form.wedding_date = value.toDate(getLocalTimeZone()).toISOString().split('T')[0];
		}
	}

	async function fetchCatalogue(id: number) {
		loading = true;
		try {
			const { data } = await axios.get<{ success: boolean; catalogues: Catalogue }>(
				`http://localhost:3000/catalogues/${id}`
			);
			if (data.success) {
				catalogue = data.catalogues;
			} else {
				errorMessage = 'Failed to fetch catalogue';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Error fetching catalogue';
		} finally {
			loading = false;
		}
	}

	async function submitOrder() {
		errorMessage = '';
		successMessage = '';
		try {
			const { data } = await axios.post('http://localhost:3000/orders/', {
				catalogue_id: catalogueId,
				...form
			});
			if (data.success) {
				successMessage = 'Order submitted successfully!';
			} else {
				errorMessage = data.message || 'Failed to submit order';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Error submitting order';
		} finally {
		}
	}

	onMount(() => {
		fetchCatalogue(catalogueId);
	});
</script>

{#if loading}
	<p>Loading...</p>
{/if}

{#if errorMessage}
	<p class="text-red-500">{errorMessage}</p>
{/if}

{#if successMessage}
	<Dialog.Root open={true}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Order Status</Dialog.Title>
				<Dialog.Description>
					{successMessage}
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{/if}

{#if catalogue}
	<Card class="mx-auto mt-6 max-w-md">
		<CardHeader>
			<CardTitle>{catalogue.package_name}</CardTitle>
		</CardHeader>
		<CardContent>
			<img src={catalogue.image} alt={catalogue.package_name} class="mb-4 rounded" />
			<p>{catalogue.description}</p>
			<p class="mt-2 font-semibold">Price: Rp. {catalogue.price}</p>

			<form class="mt-4 space-y-4" on:submit|preventDefault={submitOrder}>
				<div>
					<Label for="name">Name</Label>
					<Input id="name" type="text" bind:value={form.name} required />
				</div>

				<div>
					<Label for="email">Email</Label>
					<Input id="email" type="email" bind:value={form.email} required />
				</div>

				<div>
					<Label for="phone">Phone Number</Label>
					<Input id="phone" type="text" bind:value={form.phone_number} required />
				</div>

				<div>
					<Label>Wedding Date</Label>
					<Popover.Root bind:open>
						<Popover.Trigger>
							<Button variant="outline" class="w-48 justify-between font-normal">
								{calendarValue
									? calendarValue.toDate(getLocalTimeZone()).toLocaleDateString()
									: 'Select date'}
								<ChevronDownIcon />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto overflow-hidden p-0" align="start">
							<Calendar
								type="single"
								bind:value={calendarValue}
								captionLayout="dropdown"
								onValueChange={handleCalendarChange}
								minValue={today(getLocalTimeZone())}
							/>
						</Popover.Content>
					</Popover.Root>
				</div>

				<CardFooter>
					<Button type="submit">Submit Order</Button>
				</CardFooter>
			</form>
		</CardContent>
	</Card>
{/if}
