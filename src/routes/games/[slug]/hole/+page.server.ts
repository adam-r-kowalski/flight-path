import type { PageServerLoad } from './$types';
import { createClient } from '@vercel/postgres';

export const load: PageServerLoad = async ({ params }) => {
	const client = createClient();
	await client.connect();
	const game_result = await client.sql`
		SELECT * FROM game WHERE slug=${params.slug};
	`;
	const game = game_result.rows[0];
	const course_result = await client.sql`
		SELECT name, map, total_holes FROM course WHERE id=${game.course_id};
	`;
	const course = course_result.rows[0];
	const scores_result = await client.sql`
		SELECT 
			player.id, 
			player.name, 
			SUM(player_scores.score) - SUM(hole.par) AS total_score
		FROM player
		INNER JOIN player_scores ON player.id = player_scores.player_id
		INNER JOIN hole ON player_scores.hole_id = hole.id AND player_scores.score > 0
		WHERE 
			player_scores.game_id = ${game.id} 
		GROUP BY player.id
		ORDER BY total_score ASC;
	`;
	const scores = scores_result.rows;
	await client.end();
	return {
		game,
		course,
		scores
	};
};
