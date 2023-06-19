import type { PageServerLoad } from './$types';
import { createClient } from '@vercel/postgres';

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
