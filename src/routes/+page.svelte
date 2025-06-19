<script>
    import Button from '$lib/components/ui/button/button.svelte';
    import Image from "$lib/google-icon-logo-svgrepo-com.svg";
    
    let { data } = $props();
</script>

<div class="h-screen flex flex-col items-center justify-center gap-8">

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

