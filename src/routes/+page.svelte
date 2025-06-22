<script>
    import Button from '$lib/components/ui/button/button.svelte';
    import Image from "$lib/google-icon-logo-svgrepo-com.svg";
    import { goto } from '$app/navigation';
    import { Check, Loader } from 'lucide-svelte';
    
    let { data } = $props();

    let loading = $state(false);
</script>

<div class="h-[calc(100vh-64px)] flex flex-col items-center pt-32 gap-8">
    
    <Check class="h-48 w-48" />
    <div class="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] bg-clip-text text-transparent">
        <h1 class="text-5xl md:text-8xl font-extrabold tracking-tighter">Just Do It.</h1>
    </div>
    <Button onclick={() => {loading = true; goto(data?.user ? "/home" : "/login/google")}} size="lg" class="inline-flex" disabled={loading}>
        {#if loading}
            <Loader class="animate-spin"/>
        {/if}
        {#if data?.user}
            Access Dashboard
        {:else}
        Login to Start 
        <img src={Image} alt="Google Icon" class="inline-block ml-2 w-6 h-6" />
        {/if}
    </Button>
    <iframe title="Motivational GIF" src="https://giphy.com/embed/b7f0X8Okk1uyk" width="480" height="269" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>

