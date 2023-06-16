import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const courseNames = await locals.database.courseNames();
	const sorted = Object.values(courseNames).sort((a, b) => a.localeCompare(b));
	return {
		courses: sorted
	};
};
