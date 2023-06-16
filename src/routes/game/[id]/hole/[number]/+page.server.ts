import { error } from '@sveltejs/kit';
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

export const actions: Actions = {
	decreasePar: async ({ locals, params }) => {
		const hole = parseInt(params.number) - 1;
		await locals.database.decreasePar(params.id, hole);
	},
	increasePar: async ({ locals, params }) => {
		const hole = parseInt(params.number) - 1;
		await locals.database.increasePar(params.id, hole);
	},
	decreaseScore: async ({ request, locals, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return error(400, 'name is required');
		}
		const hole = parseInt(params.number) - 1;
		await locals.database.decreaseScore(params.id, hole, name.toString());
	},
	increaseScore: async ({ request, locals, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return error(400, 'name is required');
		}
		const hole = parseInt(params.number) - 1;
		await locals.database.increaseScore(params.id, hole, name.toString());
	}
};
