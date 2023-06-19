import type { PageServerLoad } from './$types';
import { sql } from '@vercel/postgres';

export const load: PageServerLoad = async () => {
	const course_result = await sql`
		SELECT id, name FROM course
	`;
	const courses = course_result.rows;
	return {
		courses
	};
};
