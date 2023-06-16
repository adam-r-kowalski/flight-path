import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const game = await locals.database.game(params.id);
	const scores: { [name: string]: number } = {};
	for (const player of game.players) {
		scores[player] = 0;
	}
	for (const hole of game.holes) {
		for (const player of Object.keys(hole.scores)) {
			const score = hole.scores[player];
			if (score > 0) {
				scores[player] += score - hole.par;
			}
		}
	}
	return {
		id: game.id,
		scores
	};
};

export const actions: Actions = {};
