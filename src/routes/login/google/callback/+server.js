import { generateSessionToken, createSession, setSessionTokenCookie } from "$lib/session.js";
import { google } from "$lib/auth.js";
import { decodeIdToken } from "arctic";
import { createUser, getUserFromGoogleId } from "$lib/user.js";



export async function GET(event) {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("google_oauth_state") ?? null;
    const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
    if (code === null || state === null || storedState === null || codeVerifier === null) {
        return new Response(null, {
            status: 400
        });
    }
    if (state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    let tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {

        return new Response(null, {
            status: 400
        });
    }
    const claims = decodeIdToken(tokens.idToken());
    const googleUserId = claims.sub;
    const username = claims.name;
    const picture = claims.picture;


    const existingUser = await getUserFromGoogleId(googleUserId);

    if (existingUser !== null) {
        const sessionToken = await generateSessionToken();
        const session = await createSession(sessionToken, existingUser.id);
        setSessionTokenCookie(event, sessionToken);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }

    const user = await createUser(googleUserId, username, picture);

    const sessionToken = await generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(event, sessionToken);
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/"
        }
    });
}
