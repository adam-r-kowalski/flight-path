export interface Course {
	name: string;
	address: string;
	map?: string;
	holes: number;
}

export interface Hole {
	par: number;
	scores: { [name: string]: number };
}

export interface Game {
	id: string;
	course: string;
	players: string[];
	holes: Hole[];
}

export interface DataBase {
	courseNames: () => Promise<string[]>;
	course: (name: string) => Promise<Course>;
	newGame: (course: string, n_holes: number) => Promise<string>;
	gameIds: () => Promise<string[]>;
	game: (id: string) => Promise<Game>;
	addPlayer: (id: string, player: string) => Promise<void>;
	removePlayer: (id: string, player: string) => Promise<void>;
	decreasePar: (id: string, hole: number) => Promise<void>;
	increasePar: (id: string, hole: number) => Promise<void>;
	decreaseScore: (id: string, hole: number, name: string) => Promise<void>;
	increaseScore: (id: string, hole: number, name: string) => Promise<void>;
}
