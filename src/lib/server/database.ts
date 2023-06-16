import type { Course, DataBase, Game } from '$lib/domain';

interface Courses {
	[name: string]: Course;
}

interface Games {
	[name: string]: Game;
}

const courses: Courses = {
	"Horning's Hideout": {
		name: "Horning's Hideout",
		address: '21277 NW Brunswick Canyon Rd, North Plains, OR 97133',
		holes: 18
	},
	'Pier Park': {
		name: 'Pier Park',
		address: '10325 N Lombard St, Portland, OR 97203',
		holes: 18
	},
	'Orchard Park': {
		name: 'Orchard Park',
		address: '4600 SE 115th Ave, Portland, OR 97266',
		holes: 18
	},
	'Greenway Park': {
		name: 'Greenway Park',
		address: '9150 SE 64th Ave, Portland, OR 97206',
		holes: 18
	},
	'Tualitin Community': {
		name: 'Tualitin Community',
		address: '8515 SW Tualatin Rd, Tualatin, OR 97062',
		holes: 18
	},
	Rockwood: {
		name: 'Rockwood',
		address: '18535 SE Stark St, Portland, OR 97233',
		holes: 18
	},
	'Blue Lake': {
		name: 'Blue Lake',
		address: '20500 NE Marine Dr, Fairview, OR 97024',
		holes: 18
	},
	'Leverich Park': {
		name: 'Leverich Park',
		address: '4300 NE 39th St, Vancouver, WA 98661',
		holes: 18
	},
	Glenwood: {
		name: 'Glenwood',
		address: 'SW 18th St, Vancouver, WA 98684',
		holes: 18
	},
	Champoeg: {
		name: 'Champoeg',
		map: 'https://www.dgcoursereview.com/course_files/7131/8a85322b.jpg',
		address: '8239 Champoeg Rd NE, St Paul, OR 97137',
		holes: 18
	}
};

const games: Games = {};

export const database: DataBase = {
	courseNames: async () => Object.keys(courses),
	course: async (name: string) => courses[name],
	newGame: async (course: string, n_holes: number) => {
		const id = Math.random().toString(36).substring(2, 6);
		const holes = Array(n_holes).fill({ par: 3, scores: {} });
		games[id] = {
			id,
			course,
			players: [],
			holes
		};
		return id;
	},
	gameIds: async () => Object.keys(games),
	game: async (id: string) => games[id],
	addPlayer: async (id: string, player: string) => {
		const game = games[id];
		game.players.push(player);
		game.holes.forEach((hole) => {
			hole.scores[player] = 0;
		});
	},
	removePlayer: async (id: string, player: string) => {
		const game = games[id];
		game.players = game.players.filter((p) => p !== player);
		game.holes.forEach((hole) => {
			delete hole.scores[player];
		});
	}
};
