import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const game = await locals.database.game(params.id);
	const number = parseInt(params.number);
	return {
		id: game.id,
		hole: game.holes[number - 1],
		number
	};
};

export const actions: Actions = {};
