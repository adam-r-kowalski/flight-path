import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db, sql } from '@vercel/postgres';
import new_player from '$lib/server/new_player';

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
		const client = await db.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			INSERT INTO game (slug, course_id)
			VALUES (${slug}, ${params.id})
			RETURNING id;
		`;
		const game_id = game_result.rows[0].id;
		await new_player(client, game_id, params.id);
		await client.sql`COMMIT;`;
		throw redirect(303, `/games/${slug}`);
	}
};
