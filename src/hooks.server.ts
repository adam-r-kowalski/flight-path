import type { Handle } from '@sveltejs/kit';
import { database } from './lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.database = database;
	const response = await resolve(event);
	return response;
};
