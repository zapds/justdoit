import { Pool, neonConfig } from '@neondatabase/serverless';
import { DATABASE_URL } from "$env/static/private";


const pool = new Pool({ connectionString: DATABASE_URL });

export async function execute(query, params = []) {
    const { rows } = await pool.query(query, params);
    return rows[0];
}

export async function fetch(query, params = []) {
    const { rows } = await pool.query(query, params);
    return rows;
}

export async function fetchOne(query, params = []) {
    let data = await fetch(query, params);
    return data[0];
}