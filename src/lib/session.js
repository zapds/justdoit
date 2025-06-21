import { execute, fetch, fetchOne } from "./db.js";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";



export async function setSessionTokenCookie(event, token) {
    event.cookies.set("session", token, {
        // httpOnly: true,
        // // sameSite: "lax",
        // expires: expiresAt * 1000,
        path: "/"
    });
}

export async function deleteSessionTokenCookie(event) {
    event.cookies.set("session", "", {
        // httpOnly: true,
        // sameSite: "lax",
        // maxAge: 0,
        path: "/"
    });
}

export async function generateSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token, userId) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };
    await execute(
        "INSERT INTO session (id, user_id, expires_at) VALUES ($1, $2, $3)",
        [session.id, session.userId, Math.floor(session.expiresAt.getTime() / 1000)]
    );
    return session;
}

export async function validateSessionToken(token) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const rows = await fetch("SELECT * FROM session WHERE id = $1", [sessionId]);
    const row = await fetchOne(
        `SELECT 
        session.id AS id, 
        session.user_id, 
        session.expires_at, 
        "user".id AS user_id, 
        "user".name,
        "user".picture
     FROM session 
     INNER JOIN "user" ON "user".id = session.user_id 
     WHERE session.id = $1`,
        [sessionId]
    );

    if (!row) {
        return { session: null, user: null };
    }
    const session = {
        id: row.id,
        userId: row.user_id,
        expiresAt: new Date(row.expires_at * 1000)
    };
    const user = {
        id: row.user_id,
        name: row.name,
        picture: row.picture
    };
    if (Date.now() >= session.expiresAt.getTime()) {
        await execute("DELETE FROM session WHERE id = $1", [session.id]);
        return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await execute(
            "UPDATE session SET expires_at = $1 WHERE id = $2",
            [Math.floor(session.expiresAt.getTime() / 1000),
            session.id]
        );
    }
    return { session, user };
}

export async function invalidateSession(sessionId) {
    await execute("DELETE FROM session WHERE id = $1", [sessionId]);
}

