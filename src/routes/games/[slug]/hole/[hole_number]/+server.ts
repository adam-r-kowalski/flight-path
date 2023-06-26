import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { createClient } from '@vercel/postgres';

export const POST: RequestHandler = async ({ request, params }) => {
	const data = await request.json();
	const schema = z.array(
		z.object({
			id: z.number().positive(),
			name: z.string().min(1),
			score: z.number().positive()
		})
	);
	const parsed = schema.safeParse(data);
	if (!parsed.success) throw error(400, parsed.error.message);
	const client = createClient();
	await client.connect();
	await client.sql`BEGIN;`;
	const game_result = await client.sql`
		SELECT id, course_id FROM game WHERE slug=${params.slug};
	`;
	const game = game_result.rows[0];
	const hole_result = await client.sql`
		SELECT id
		FROM hole
		WHERE hole_number=${params.hole_number}
		AND course_id=${game.course_id}
	`;
	const hole = hole_result.rows[0];
	for (const player of parsed.data) {
		await client.sql`
			UPDATE player_scores
			SET score=${player.score}
			WHERE player_id=${player.id}
			AND game_id=${game.id}
			AND hole_id=${hole.id};
		`;
	}
	await client.sql`COMMIT;`;
	await client.end();
	return json({ message: 'Scores updated successfully' });
};
