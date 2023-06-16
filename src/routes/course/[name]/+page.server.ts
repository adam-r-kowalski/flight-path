import * as db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const course = db.courses[params.name];
	return {
		course
	};
};
