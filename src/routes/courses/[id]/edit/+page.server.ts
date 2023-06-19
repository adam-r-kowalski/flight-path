import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

export const load: PageServerLoad = async ({ params: { id } }) => {
	const result = await sql`SELECT * FROM course WHERE id=${id}`;
	return {
		course: result.rows[0]
	};
};

const schema = z.object({
	name: z.string().min(1).max(255),
	address: z.string().min(1),
	total_holes: z.coerce.number().int().positive(),
	map: z.string().optional()
});

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = Object.fromEntries(await request.formData());
		const parsed = schema.safeParse(data);
		if (!parsed.success) return fail(400, { ...data, incorrect: true });
		const { name, address, total_holes, map } = parsed.data;
		await sql`
			UPDATE course
			SET name=${name}, address=${address}, total_holes=${total_holes}, map=${map}
			WHERE id=${params.id};
		`;
		throw redirect(303, `/courses/${params.id}?created=true`);
	}
};
