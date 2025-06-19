<script>
    import Button from '$lib/components/ui/button/button.svelte';
    import Image from "$lib/google-icon-logo-svgrepo-com.svg";
    import { Check } from 'lucide-svelte';
    
    let { data } = $props();
</script>

<div class="h-[calc(100vh-64px)] flex flex-col items-center pt-32 gap-8">
    
    <Check class="h-48 w-48 text-primary" />
    <h1 class="text-8xl font-extrabold tracking-tighter">Just Do It.</h1>
    <Button size="lg" data-sveltekit- href={data?.user ? "/home" : "/login/google"} class="inline-flex">
        {#if data?.user}
            Access Dashboard
        {:else}
        Login to Start 
        <img src={Image} alt="Google Icon" class="inline-block ml-2 w-6 h-6" />
        {/if}
    </Button>
</div>

