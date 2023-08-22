export type BerryFirmness =
	| 'very-soft'
	| 'soft'
	| 'hard'
	| 'very-hard'
	| 'super-hard';

export interface FlavorPotencyMap {
	spicy: number;
	dry: number;
	sweet: number;
	bitter: number;
	sour: number;
}

export interface GetBerriesListResponse {
	count: number;
	berries: {
		id: number;
		name: string;
		spriteUrl: string | null;
		firmness: BerryFirmness;
		flavorPotencyMap: FlavorPotencyMap;
	}[];
}
