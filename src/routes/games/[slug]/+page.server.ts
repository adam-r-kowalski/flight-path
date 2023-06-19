import new_player from '$lib/server/new_player';
import type { Actions, PageServerLoad } from './$types';
import { db } from '@vercel/postgres';

export const load: PageServerLoad = async ({ params }) => {
	const client = await db.connect();
	const game_result = await client.sql`
		SELECT id, course_id FROM game WHERE slug=${params.slug};
	`;
	const game = game_result.rows[0];
	const course_result = await client.sql`
		SELECT name FROM course WHERE id=${game.course_id};
	`;
	const course = course_result.rows[0];
	const players_result = await client.sql`
		SELECT id, name FROM player WHERE game_id=${game.id};
	`;
	return {
		course,
		players: players_result.rows
	};
};

export const actions: Actions = {
	add_player: async ({ params }) => {
		const client = await db.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			SELECT id, course_id FROM game WHERE slug=${params.slug};
		`;
		const game = game_result.rows[0];
		await new_player(client, game.id, game.course_id);
		await client.sql`COMMIT;`;
	}
};
