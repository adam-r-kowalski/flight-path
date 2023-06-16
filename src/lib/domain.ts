export interface Course {
	name: string;
	address: string;
	map?: string;
	holes: number;
}

export interface Courses {
	[name: string]: Course;
}
