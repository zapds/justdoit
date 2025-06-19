<script>
	import '../app.css';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, MenuIcon } from 'lucide-svelte';
	
	let { children, data } = $props();
</script>

<div class="h-16 mx-auto flex max-w-7xl flex-row gap-4 items-center">
	<div>
		<a href="/">
			<Check class="h-8 w-8 text-primary" />
		</a>
	</div>
	<div class="ml-auto">
		{#if data?.user}
			<Avatar.Root class="ml-auto">
				<Avatar.Image src={data.user.picture} alt="User Avatar" />
				<Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
			</Avatar.Root>
		{:else}
			<MenuIcon class="ml-auto" />
		{/if}
	</div>
</div>

{@render children()}
