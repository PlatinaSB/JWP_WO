<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import axios from 'axios';

	let username = '';
	let password = '';
	let loading = false;
	let errorMessage = '';

	const handleLogin = async () => {
		loading = true;
		errorMessage = '';

		try {
			const { data } = await axios.post(
				'http://localhost:3000/user/login',
				{ username, password },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			console.log('Login success:', data);

			// store token if backend returns it
			if (data?.token) {
				localStorage.setItem('token', data.token);
				console.log('Token saved to localStorage:', data.token);
			}

			// 👉 redirect after login
			// window.location.href = '/';
		} catch (error: any) {
			console.error(error);
			errorMessage = error?.response?.data?.message || 'Login failed';
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center  px-4 ">
	<Card class="w-full max-w-sm shadow-lg">
		<CardHeader>
			<CardTitle class="text-center text-2xl font-bold">Login</CardTitle>
		</CardHeader>

		<CardContent class="space-y-4">
			<div class="space-y-2">
				<Label for="username">Username</Label>
				<Input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Enter your username"
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
		</CardContent>

		<CardFooter class="flex flex-col space-y-3">
			<Button class="w-full" onclick={handleLogin} disabled={loading}>
				{loading ? 'Signing in...' : 'Sign In'}
			</Button>
		</CardFooter>
	</Card>
</div>
