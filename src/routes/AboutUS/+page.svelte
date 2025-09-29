<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
</script>

<div class="flex flex-col">
	<!-- Centered About Us content -->
	<div class="flex h-screen w-screen flex-grow items-center justify-center">
		<div class="max-w-2xl px-6 text-center">
			<h1 class="mb-4 text-4xl font-bold ">
				JeWePe Wedding Organizer
			</h1>
			<p class="text-lg ">
				World leading Wedding Organizer for combat ship from Azure Lane to Kantai Collection
			</p>
		</div>
	</div>

	<!-- Footer -->
	<footer class="w-full ">
		<Card class="mx-auto max-w-4xl shadow-md">
			<CardHeader>
				<CardTitle>About This Project</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4 ">
				<p>
					This project was created as part of the <strong>Gunadarma LSP program</strong> for the
					creator to develop a website using the given study case:
					<strong>JeWePe Wedding Organizer</strong>.
				</p>

				<p>
					The case study is about JeWePe Wedding Organizer needing a communication platform to
					provide information to its customers while enabling them to order wedding packages online.
					The online WO JeWePe is managed by an admin. The information can be read publicly and used
					to make package bookings.
				</p>

				<p>
					The admin can manage the online WO after logging in. They can manage the website profile
					and catalogue by adding, editing, or deleting entries. For orders, the admin can update
					the status from "request" to "approved". They can also generate reports listing all
					package orders.
				</p>

				<p>
					Users can browse the catalogue and place orders via a form using their email as
					identification. Customers can check their order status through replies from the admin.
				</p>
			</CardContent>
		</Card>
	</footer>
</div>
