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
    <iframe src="https://www.youtube-nocookie.com/embed/ZXsQAXx_ao0?si=Mime-mdhNfaRjc3_&amp;autoplay=1" title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media; web-share;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

