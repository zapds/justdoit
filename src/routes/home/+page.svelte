<script>
    import * as Select from "$lib/components/ui/select/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Button from "$lib/components/ui/button/button.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { Circle, CircleDashed, PartyPopper, Pin, CircleCheckBig, Trash2 } from "lucide-svelte";
    import { draw, fade } from "svelte/transition";
    const { data, form } = $props();


    let pending = $state(false);
    /*
    CREATE TABLE tasks (
        user_id 
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date TIMESTAMP
    )
    */


    let sortOptions = [
        { value: "default", label: "Newest first" },
        { value: "oldest", label: "Oldest first"}

    ]
    let tasks = $state(data.tasks);
    let mode = $state("default");
    let sort = $state("default");

    $effect(() => {
        if (mode === "default") {
            tasks = data.tasks.filter(task => !task.completed);
        } else {
            tasks = data.tasks;
        }
    });

    $effect(() => {
        if (sort === "default") {
            tasks = tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sort === "oldest") {
            tasks = tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
    });
    $inspect(tasks);

    const triggerContent = $derived(
    sortOptions.find((f) => f.value === sort)?.label ?? "Sort by"
    );
</script>

{#if form?.error}
<p class="error">{form.error}</p>
{/if}


<div class="flex flex-row w-screen pt-16 px-2">
    <div class="flex rounded-md border flex-col m-2 grow max-w-4xl mx-auto p-8 ">
        <div class="flex flex-row flex-wrap w-full py-8 items-center gap-4">
            <div class="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] bg-clip-text text-transparent">
                <h1 class="text-4xl font-extrabold tracking-tighter">Just Do These.</h1>
            </div>
            <Button variant="outline" class="hover:text-primary" onclick={() => mode = mode === "default" ? "all" : "default"}>
                {#if mode == "default"}
                Show Completed 
                {:else}
                Hide Completed   
                {/if}
            </Button>
<!-- 
            <Button variant="outline" class="hover:text-primary" onclick={() => showMotivation = !showMotivation}>
                I need motivation!!
            </Button> -->

 
            <Select.Root type="single" name="sort" bind:value={sort}>
                <Select.Trigger class="w-[180px]">
                    {triggerContent}
                </Select.Trigger>
                <Select.Content>
                    {#each sortOptions as option (option.value)}
                        <Select.Item
                        value={option.value}
                        label={option.label}>
                        {option.label}
                        </Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
            <span class="ml-auto font-extralight">
                {tasks.length}
            </span>
        </div>
        {#if tasks.length === 0 && !pending }
        <div class="flex flex-col text-primary/90 h-full w-full items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-party-popper-icon lucide-party-popper">
                <path in:draw d="M5.8 11.3 2 22l10.7-3.79"/>
                <path in:draw d="M4 3h.01"/>
                <path in:draw d="M22 8h.01"/>
                <path in:draw d="M15 2h.01"/>
                <path in:draw d="M22 20h.01"/>
                <path in:draw d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>
                <path in:draw d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/>
                <path in:draw d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/>
                <path in:draw d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>
              </svg>
              
        <p in:fade class="text-center text-2xl font-extrabold tracking-tigher">I can't tell if you're jobless or perfect</p>
        </div>
        {/if}
        
        <ul class="flex w-full flex-col gap-4 max-w-7xl">
            {#each tasks as task (task.id)}
                {#if task.pinned === true}
                    <form
                    method="POST"
                    use:enhance={({ formElement, formData, action }) => {
                        if (action.search === "?/done") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, completed: !t.completed };
                                }
                                return t;
                            });
                        } else if (action.search === "?/pin") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, pinned: true };
                                }
                                return t;
                            });
                        } else if (action.search === "?/unpin") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, pinned: false };
                                }
                                return t;
                            });
                        } else if (action.search === "?/delete") {
                            tasks = tasks.filter(t => t.id !== task.id);
                        }
                        return async ({ result }) => {
                            if (result.type === 'success') {
                                await applyAction(result);
                                await invalidateAll();
                            }
                        };
                
                    }}
                        >
                        <input type="hidden" name="taskId" value={task.id} />
                        <div class="w-full inline-flex flex-row items-center border border-transparent hover:border-border p-4 rounded-md transition-all duration-200">
                            <button formaction={task.completed ? "?/undone" : "?/done"} class="size-10" variant="icon">
                                {#if task.completed}
                                <CircleCheckBig class="text-primary font-bold" size="24" />
                                {:else}
                                <Circle class="text-primary font-bold" size="24" />
                                {/if}
                            </button>
                            <p class="text-2xl">{task.title}</p>
                            <button formaction="?/unpin" class="ml-auto size-10" variant="icon">
                                <Pin class="hover:fill-primary transition-all duration-200" size="24"/>
                            </button>
                            <button formaction="?/delete" class="size-10 opacity-0 group-hover:opacity-100 transition-all duration-200" variant="icon">
                                <Trash2 class="hover:fill-destructive stroke-destructive transition-all duration-200" size="24"/>
                            </button>
                        </div>

                    </form>
                {/if}
            {/each}
            {#if pending === true}
                <div class="inline-flex flex-row items-center border border-transparent hover:border-border p-4 rounded-md transition-all duration-200">
                    <button class="size-10" variant="icon">
                        <CircleDashed class="animate-pulse text-primary" size="24" />
                    </button>
                    <Skeleton class="h-6 w-[200px] bg-primary/50" />
                </div>
            {/if}
            {#each tasks as task (task.id)}
                {#if !task.pinned}
                    <form
                    method="POST"
                    use:enhance={({ formElement, formData, action }) => {
                        console.log("Action:", action);
                        if (action.search === "?/done") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, completed: !t.completed };
                                }
                                return t;
                            });
                        } else if (action.search === "?/pin") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, pinned: true };
                                }
                                return t;
                            });
                        } else if (action.search === "?/unpin") {
                            tasks = tasks.map(t => {
                                if (t.id === task.id) {
                                    return { ...t, pinned: false };
                                }
                                return t;
                            });
                        } else if (action.search === "?/delete") {
                            tasks = tasks.filter(t => t.id !== task.id);
                        }
                        return async ({ result }) => {
                            if (result.type === 'success') {
                                await applyAction(result);
                                await invalidateAll();
                            }
                        };
                
                    }}
                        >
                        <input type="hidden" name="taskId" value={task.id} />
                        <div class="group w-full inline-flex flex-row items-center border border-transparent hover:border-border p-4 rounded-md transition-all duration-200">
                            <button formaction={task.completed ? "?/undone" : "?/done"} class="size-10" variant="icon">
                                {#if task.completed}
                                <CircleCheckBig class="text-primary font-bold" size="24" />
                                {:else}
                                <Circle class="text-primary font-bold" size="24" />
                                {/if}
                            </button>
                            <p class="text-2xl">{task.title}</p>
                            <button formaction="?/pin" class="size-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200" variant="icon">
                                <Pin class="hover:fill-primary transition-all duration-200" size="24"/>
                            </button>
                            <button formaction="?/delete" class="size-10 opacity-0 group-hover:opacity-100 transition-all duration-200" variant="icon">
                                <Trash2 class="hover:fill-destructive stroke-destructive transition-all duration-200" size="24"/>
                            </button>
                        </div>

                    </form>

                {/if}
            {/each}
        </ul>
    
    </div>
</div>

<form
    method="POST"
    action="?/create"
    use:enhance={({ formElement, formData, action }) => {
        tasks = [{id: tasks.length + 1, title: formData.get('task'), completed: false, pinned: false}, ...tasks];
        formElement.reset();
        return async ({ result }) => {
            if (result.type === 'success') {
                await applyAction(result);
                await invalidateAll();
            }
        };

    }}
>
    <div class="fixed bottom-32 flex flex-row w-screen justify-center">
        <input
            name="task"
            autofocus
            class="bg-background text-xl md:text-4xl max-w-7xl outline-0 placeholder:text-muted-foreground placeholder:tracking-tighter rounded-full shadow-xl flex border px-8 py-4"
            placeholder="Add a new task..." />
    </div>
</form>
