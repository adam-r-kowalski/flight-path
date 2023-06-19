import type { VercelPoolClient } from '@vercel/postgres';

export default async (client: VercelPoolClient, game_id: string, course_id: string) => {
	const number_of_players = await client.sql`
		SELECT COUNT(*) FROM player WHERE game_id=${game_id};
	`;
	const name = `Player ${parseInt(number_of_players.rows[0].count) + 1}`;
	const player_result = await client.sql`
		INSERT INTO player (name, game_id, total_score)
        VALUES (${name}, ${game_id}, 0)
		RETURNING id;
	`;
	const player_id = player_result.rows[0].id;
	const holes_result = await client.sql`
		SELECT id, hole_number FROM hole WHERE course_id=${course_id};
	`;
	for (const hole of holes_result.rows) {
		await client.sql`;
			INSERT INTO player_scores (player_id, game_id, hole_id, hole_number, score)
			VALUES (${player_id}, ${game_id}, ${hole.id}, ${hole.hole_number}, 0);
		`;
	}
};
