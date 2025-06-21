import { execute } from '$lib/db.js';


export async function load(event) {
    const tasks = await execute(
        "SELECT id, title, completed, created_at, pinned FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
        [event.locals.user.id]
    )
    console.log("Tasks loaded:", tasks);
    return {
        tasks: tasks || [],
    };
}

export const actions = {
	create: async (event) => {
		const user = event.locals.user;
        const data = await event.request.formData();
        const task = data.get("task");

        if (!user) {
            return {
                status: 401,
                error: "Unauthorized"
            };
        }

        if (!task || typeof task !== "string" || task.trim() === "") {
            return {
                status: 400,
                error: "Task is required"
            };
        }
        const taskData = await execute(
            "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id",
            [task, user.id]
        );

	},

    delete: async (event) => {
        const user = event.locals.user;
        const data = await event.request.formData();
        const taskId = data.get("taskId");

        if (!user) {
            return {
                status: 401,
                error: "Unauthorized"
            };
        }

        if (!taskId || typeof taskId !== "string") {
            return {
                status: 400,
                error: "Task ID is required"
            };
        }

        await execute(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
            [taskId, user.id]
        );
    },

    pin: async (event) => {
        const user = event.locals.user;
        const data = await event.request.formData();
        const taskId = data.get("taskId");

        if (!user) {
            return {
                status: 401,
                error: "Unauthorized"
            };
        }

        if (!taskId || typeof taskId !== "string") {
            return {
                status: 400,
                error: "Task ID is required"
            };
        }

        await execute(
            "UPDATE tasks SET pinned = True WHERE id = $1 AND user_id = $2",
            [taskId, user.id]
        );
    },
    unpin: async (event) => {
        const user = event.locals.user;
        const data = await event.request.formData();
        const taskId = data.get("taskId");

        if (!user) {
            return {
                status: 401,
                error: "Unauthorized"
            };
        }

        if (!taskId || typeof taskId !== "string") {
            return {
                status: 400,
                error: "Task ID is required"
            };
        }

        await execute(
            "UPDATE tasks SET pinned = False WHERE id = $1 AND user_id = $2",
            [taskId, user.id]
        );
    },
    done: async (event) => {
        const user = event.locals.user;
        const data = await event.request.formData();
        const taskId = data.get("taskId");

        if (!user) {
            return {
                status: 401,
                error: "Unauthorized"
            };
        }

        if (!taskId || typeof taskId !== "string") {
            return {
                status: 400,
                error: "Task ID is required"
            };
        }

        await execute(
            "UPDATE tasks SET completed = True WHERE id = $1 AND user_id = $2",
            [taskId, user.id]
        );
    }
}