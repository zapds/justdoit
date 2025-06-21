<script>
	import '../app.css';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, MenuIcon } from 'lucide-svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	
	let { children, data } = $props();
</script>

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
				<DropdownMenu.Item><a href={data.user ? "/logout" : "/login/google"}>{data.user ? "Logout" : "Login"}</a></DropdownMenu.Item>

			  </DropdownMenu.Group>
			</DropdownMenu.Content>
		  </DropdownMenu.Root>
	</div>
</div>

{@render children()}
