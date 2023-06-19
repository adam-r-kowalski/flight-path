import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { sql } from '@vercel/postgres';

export const load: PageServerLoad = async ({ url, params: { id } }) => {
	const created = url.searchParams.get('created') === 'true';
	const result = await sql`SELECT * FROM course WHERE id=${id}`;
	return {
		created,
		course: result.rows[0]
	};
};

export const actions: Actions = {
	default: async ({ params }) => {
		const slug = crypto.randomUUID();
		await sql`
			INSERT INTO game (slug, course_id)
			VALUES (${slug}, ${params.id});
		`;
		throw redirect(303, `/games/${slug}`);
	}
};
