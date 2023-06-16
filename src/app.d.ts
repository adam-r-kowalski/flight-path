// See https://kit.svelte.dev/docs/types#app

import type { DataBase } from '$lib/domain';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			database: DataBase;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
