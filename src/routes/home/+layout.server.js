import { redirect } from "@sveltejs/kit";


export const load = async (event) => {
    if (!event.locals.user) {
        return redirect(302, "/login/google");
    }

    return {
        user: event.locals.user,
    };
};