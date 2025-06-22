<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Button from "$lib/components/ui/button/button.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { Circle, CircleDashed, PartyPopper, Pin, CircleCheckBig, Trash2 } from "lucide-svelte";
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

    let tasks = $state(data.tasks);
    let mode = $state("default");
    $effect(() => {
        if (mode === "default") {
            tasks = data.tasks.filter(task => !task.completed);
        } else {
            tasks = data.tasks;
        }
    });
    $inspect(tasks);

</script>

{#if form?.error}
<p class="error">{form.error}</p>
{/if}


<div class="flex flex-row w-screen pt-16 px-2">
    <div class="flex rounded-md border flex-col m-4 grow max-w-4xl mx-auto p-8 ">
        <div class="flex flex-row w-full py-8 items-center gap-8">
            <h1 class="text-4xl font-extrabold tracking-tighter">Just Do These.</h1>
            <Button variant="outline" onclick={() => mode = mode === "default" ? "all" : "default"}>
                {#if mode == "default"}
                Show Completed 
                {:else}
                Hide Completed   
                {/if}
            </Button>
            <span class="ml-auto font-extralight">
                {tasks.length}
            </span>
        </div>
        {#if tasks.length === 0 && !pending }
        <div class="flex flex-col text-primary/90 h-full w-full items-center justify-center">
            <PartyPopper size="64" />
            <p class="text-center text-2xl font-extrabold tracking-tigher">I can't tell if you're jobless or perfect</p>
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
        return async ({ result }) => {
            if (result.type === 'success') {
                await applyAction(result);
                await invalidateAll();
                formElement.reset();
            }
        };

    }}
>
    <div class="fixed bottom-32 flex flex-row w-screen justify-center">
        <input
            name="task"
            disabled={pending}
            autofocus
            class="bg-background text-xl md:text-4xl max-w-7xl outline-0 placeholder:text-muted-foreground placeholder:font-extrabold placeholder:tracking-tighter rounded-full shadow-xl flex border px-8 py-4"
            placeholder="Add a new task..." />
    </div>
</form>
