import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const gameIds = await locals.database.gameIds();
	const sorted = Object.values(gameIds).sort((a, b) => a.localeCompare(b));
	return {
		games: sorted
	};
};
