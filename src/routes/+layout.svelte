<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher></ModeWatcher>
<Navbar></Navbar>

{@render children?.()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code&display=swap');
</style>
