import * as db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const courses = Object.values(db.courses).sort((a, b) => a.name.localeCompare(b.name));
	return {
		courses
	};
};
