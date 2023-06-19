import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { db } from '@vercel/postgres';

const schema = z.object({
	name: z.string().min(1).max(255),
	address: z.string().min(1),
	total_holes: z.coerce.number().int().positive(),
	map: z.string().optional()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const { name, address, total_holes, map } = parsed.data;
		const client = await db.connect();
		await client.sql`BEGIN;`;
		const result = await client.sql`
			INSERT INTO course (name, address, total_holes, map)
			VALUES (${name}, ${address}, ${total_holes}, ${map})
			RETURNING id;
		`;
		const course_id = result.rows[0].id;
		for (let i = 1; i <= total_holes; i++) {
			await client.sql`
				INSERT INTO hole (course_id, hole_number, par, distance_to_basket, map)
				VALUES (${course_id}, ${i}, 3, 400, NULL);
			`;
		}
		await client.sql`COMMIT;`;
	}
};
