import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createClient } from '@vercel/postgres';
import { z } from 'zod';

export const load: PageServerLoad = async ({ params }) => {
	const client = createClient();
	await client.connect();
	const game_result = await client.sql`
		SELECT * FROM game WHERE slug=${params.slug};
	`;
	const game = game_result.rows[0];
	const course_result = await client.sql`
		SELECT * FROM course WHERE id=${game.course_id};
	`;
	const course = course_result.rows[0];
	const players_result = await client.sql`
		SELECT id, name FROM player WHERE game_id=${game.id};
	`;
	await client.end();
	return {
		course,
		game,
		players: players_result.rows
	};
};

export const actions: Actions = {
	new_player: async ({ params, request }) => {
		const data = Object.fromEntries(await request.formData());
		const schema = z.object({
			name: z.string().min(1)
		});
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const client = createClient();
		await client.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			SELECT id, course_id FROM game WHERE slug=${params.slug};
		`;
		const game = game_result.rows[0];
		const course_id = game.course_id;
		const game_id = game.id;
		const player_result = await client.sql`
			INSERT INTO player (name, game_id)
			VALUES (${parsed.data.name}, ${game_id})
			RETURNING id;
		`;
		const player_id = player_result.rows[0].id;
		const holes_result = await client.sql`
			SELECT id FROM hole WHERE course_id=${course_id};
		`;
		for (const hole of holes_result.rows) {
			await client.sql`;
				INSERT INTO player_scores (player_id, game_id, hole_id, score)
				VALUES (${player_id}, ${game_id}, ${hole.id}, 0);
			`;
		}
		await client.sql`COMMIT;`;
		await client.end();
	},
	remove_player: async ({ params, request }) => {
		const data = Object.fromEntries(await request.formData());
		const schema = z.object({
			id: z.string().min(1)
		});
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const client = createClient();
		await client.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			SELECT id, course_id FROM game WHERE slug=${params.slug};
		`;
		const game = game_result.rows[0];
		const game_id = game.id;
		await client.sql`
			DELETE FROM player_scores WHERE player_id=${parsed.data.id} AND game_id=${game_id};
		`;
		await client.sql`
			DELETE FROM player WHERE id=${parsed.data.id} AND game_id=${game_id};
		`;
		await client.sql`COMMIT;`;
		await client.end();
	}
};
