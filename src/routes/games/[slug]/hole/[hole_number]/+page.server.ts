import { fail, redirect } from '@sveltejs/kit';
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
	const hole_result = await client.sql`
		SELECT *
		    FROM hole
		    WHERE course_id=${game.course_id}
			AND hole_number=${params.hole_number};
	`;
	if (!hole_result.rows.length) throw redirect(303, `/games/${params.slug}/hole`);
	const hole = hole_result.rows[0];
	const scores_results = await client.sql`
		SELECT player.id, player.name, player_scores.score
		FROM player_scores
		JOIN player ON player.id=player_scores.player_id
		WHERE player_scores.game_id=${game.id}
		AND player_scores.hole_id=${hole.id}
		ORDER BY player.name ASC;
	`;
	const scores = scores_results.rows;
	await client.end();
	return {
		game,
		hole,
		scores
	};
};

export const actions: Actions = {
	increase_score: async ({ params, request }) => {
		const data = Object.fromEntries(await request.formData());
		const schema = z.object({ id: z.string().min(1) });
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const client = createClient();
		await client.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			SELECT id, course_id FROM game WHERE slug=${params.slug};
		`;
		const game = game_result.rows[0];
		await client.sql`
			UPDATE player_scores
			SET score=score+1
			WHERE player_id=${parsed.data.id}
			AND game_id=${game.id}
			AND hole_id=(
				SELECT id
				FROM hole
				WHERE hole_number=${params.hole_number}
				AND course_id=${game.course_id}
			);
		`;

		await client.sql`COMMIT;`;
		await client.end();
	},
	decrease_score: async ({ params, request }) => {
		const data = Object.fromEntries(await request.formData());
		const schema = z.object({ id: z.string().min(1) });
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const client = createClient();
		await client.connect();
		await client.sql`BEGIN;`;
		const game_result = await client.sql`
			SELECT id, course_id FROM game WHERE slug=${params.slug};
		`;
		const game = game_result.rows[0];
		await client.sql`
			UPDATE player_scores
			SET score=GREATEST(0, score-1)
			WHERE player_id=${parsed.data.id}
			AND game_id=${game.id}
			AND hole_id=(
				SELECT id
				FROM hole
				WHERE hole_number=${params.hole_number}
				AND course_id=${game.course_id}
			);
		`;

		await client.sql`COMMIT;`;
		await client.end();
	}
};
