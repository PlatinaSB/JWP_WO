<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<nav class="w-full px-6 py-3 font-[Google_Sans_Code] shadow-sm">
	<NavigationMenu.Root class="w-full">
		<NavigationMenu.List class="flex w-full items-center justify-between">
			<!-- Left: Logo -->
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/" class="text-xl font-bold">JeWePe WO</NavigationMenu.Link>
			</NavigationMenu.Item>

			<!-- Center: Menu Items -->
			<div class="flex items-center space-x-6">
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/catalogues" class="text-lg font-medium">
						Katalog
					</NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Link href="/AboutUS" class="text-lg font-medium">
						About Us
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</div>

			<!-- Right: Login + Dark Mode -->
			<div class="flex items-center space-x-4">
				<NavigationMenu.Item>
					<Button href="/login">Login</Button>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<Button onclick={toggleMode} variant="outline" size="icon">
						<SunIcon
							class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
						/>
						<MoonIcon
							class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</NavigationMenu.Item>
			</div>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</nav>
