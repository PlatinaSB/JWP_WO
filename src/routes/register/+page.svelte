<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import axios from 'axios';

	let name = '';
	let username = '';
	let password = '';
	let loading = false;
	let errorMessage = '';
	let successMessage = '';

	const handleRegister = async () => {
		loading = true;
		errorMessage = '';
		successMessage = '';

		try {
			const { data } = await axios.post(
				'http://localhost:3000/user/register',
				{ name, username, password },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			console.log('Register success:', data);
			successMessage = 'Registration successful! You can now login.';
		} catch (error: any) {
			console.error(error);
			errorMessage = error?.response?.data?.message || 'Registration failed';
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-black">
	<Card class="w-full max-w-sm shadow-lg">
		<CardHeader>
			<CardTitle class="text-center text-2xl font-bold">Register</CardTitle>
		</CardHeader>

		<CardContent class="space-y-4">
			<div class="space-y-2">
				<Label for="name">Full Name</Label>
				<Input
					id="name"
					type="text"
					bind:value={name}
					placeholder="Enter your full name"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="username">Username</Label>
				<Input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Choose a username"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					required
				/>
			</div>

			{#if errorMessage}
				<p class="text-sm text-red-500">{errorMessage}</p>
			{/if}
			{#if successMessage}
				<p class="text-sm text-green-600">{successMessage}</p>
			{/if}
		</CardContent>

		<CardFooter class="flex flex-col space-y-3">
			<Button class="w-full" onclick={handleRegister} disabled={loading}>
				{loading ? 'Registering...' : 'Register'}
			</Button>

			<p class="text-center text-sm text-muted-foreground">
				Already have an account? <a href="/login" class="underline">Login</a>
			</p>
		</CardFooter>
	</Card>
</div>
