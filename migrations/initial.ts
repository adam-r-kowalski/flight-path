import { sql } from '@vercel/postgres';
import { config } from 'dotenv';

config();

export const migrate = async () => {
	await sql`
		CREATE TABLE IF NOT EXISTS course (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			address TEXT NOT NULL,
			total_holes INT NOT NULL,
			map TEXT
		);

		CREATE TABLE IF NOT EXISTS hole (
			id SERIAL PRIMARY KEY,
			course_id INT NOT NULL REFERENCES course(id),
			hole_number INT NOT NULL,
			par INT NOT NULL,
			distance_to_basket INT,
			map TEXT
		);

        CREATE TABLE IF NOT EXISTS game (
			id SERIAL PRIMARY KEY,
			slug VARCHAR(255) NOT NULL UNIQUE,
			course_id INT NOT NULL REFERENCES course(id)
        );

		CREATE TABLE IF NOT EXISTS player (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			game_id INT NOT NULL REFERENCES game(id)
		);

		CREATE TABLE IF NOT EXISTS player_scores (
		    id SERIAL PRIMARY KEY,
		    player_id INT NOT NULL REFERENCES player(id),
		    game_id INT NOT NULL REFERENCES game(id),
		    hole_id INT NOT NULL REFERENCES hole(id),
		    score INT NOT NULL
		);
	`;
};

migrate();
