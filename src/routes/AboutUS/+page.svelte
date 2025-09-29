<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
</script>

<div class="flex flex-col">
	<!-- Centered About Us content -->
	<div class="w-screen h-screen flex-grow flex items-center justify-center">
		<div class="text-center max-w-2xl px-6">
			<h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">JeWePe Wedding Organizer</h1>
			<p class="text-lg text-gray-700 dark:text-gray-300">
				World leading Wedding Organizer for combat ship from Azure Lane to Kantai Collection
			</p>
		</div>
	</div>

	<!-- Footer -->
	<footer class="w-full py-6 bg-gray-100 dark:bg-gray-900">
		<Card class="shadow-md max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>About This Project</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4 text-gray-700 dark:text-gray-300">
				<p>
					This project was created as part of the <strong>Gunadarma LSP program</strong> for the creator
					to develop a website using the given study case: <strong>JeWePe Wedding Organizer</strong>.
				</p>

				<p>
					The case study is about JeWePe Wedding Organizer needing a communication platform to provide
					information to its customers while enabling them to order wedding packages online. The online
					WO JeWePe is managed by an admin. The information can be read publicly and used to make package
					bookings.
				</p>

				<p>
					The admin can manage the online WO after logging in. They can manage the website profile and
					catalogue by adding, editing, or deleting entries. For orders, the admin can update the status
					from "request" to "approved". They can also generate reports listing all package orders.
				</p>

				<p>
					Users can browse the catalogue and place orders via a form using their email as identification.
					Customers can check their order status through replies from the admin.
				</p>
			</CardContent>
		</Card>
	</footer>
</div>
