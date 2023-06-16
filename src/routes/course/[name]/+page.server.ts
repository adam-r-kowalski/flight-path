import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const course = await locals.database.course(params.name);
	return {
		course
	};
};

export const actions: Actions = {
	newGame: async ({ locals, params }) => {
		const course = await locals.database.course(params.name);
		const id = await locals.database.newGame(course.name, course.holes);
		throw redirect(303, `/game/${id}`);
	}
};
