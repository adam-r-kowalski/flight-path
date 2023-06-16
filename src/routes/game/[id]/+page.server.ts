import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const game = await locals.database.game(params.id);
	return {
		game
	};
};

export const actions: Actions = {
	addPlayer: async ({ request, locals, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return error(400, 'name is required');
		}
		await locals.database.addPlayer(params.id, name.toString());
	},
	removePlayer: async ({ request, locals, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return error(400, 'name is required');
		}
		await locals.database.removePlayer(params.id, name.toString());
	}
};
