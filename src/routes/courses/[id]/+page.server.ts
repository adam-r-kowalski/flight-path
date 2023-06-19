import type { PageServerLoad } from './$types';
import { sql } from '@vercel/postgres';

export const load: PageServerLoad = async ({ url, params: { id } }) => {
	const created = url.searchParams.get('created') === 'true';
	const result = await sql`SELECT * FROM course WHERE id=${id}`;
	return {
		created,
		course: result.rows[0]
	};
};
