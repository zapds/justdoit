<script>
	import '../app.css';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, Database, LogInIcon, LogOutIcon, MenuIcon, MoonIcon, SunIcon } from 'lucide-svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { mode, ModeWatcher, toggleMode, } from 'mode-watcher';
	
	let { children, data } = $props();
</script>


<ModeWatcher />
<div class="h-16 px-2 mx-auto flex max-w-7xl flex-row gap-4 items-center">
	<div>
		<a href="/">
			<Check class="h-8 w-8 text-primary" />
		</a>
	</div>
	<div class="ml-auto">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#if data?.user}
					<Avatar.Root class="ml-auto">
						<Avatar.Image src={data.user.picture} alt="User Avatar" />
						<Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
					</Avatar.Root>
				{:else}
					<MenuIcon class="ml-auto" />
				{/if}

			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
			  <DropdownMenu.Group>
				<DropdownMenu.Label>{data.user ? data.user.name : "Not signed in"}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={toggleMode}>
					{#if mode.current === 'dark'}
						<SunIcon />
						Light Mode
					{:else}
						<MoonIcon />
						Dark Mode
					{/if}
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					{#if data.user}
						<LogOutIcon />
						<a href="/logout">
							Logout
						</a>
					{:else}
						<LogInIcon />
						<a href="/login/google">
							Login
						</a>
					{/if}
				</DropdownMenu.Item>
			  </DropdownMenu.Group>
			</DropdownMenu.Content>
		  </DropdownMenu.Root>
	</div>
</div>

{@render children()}
