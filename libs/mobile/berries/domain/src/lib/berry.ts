import {
	BerryFirmness,
	FlavorPotencyMap,
} from '@pokemon-berry-store/shared/request-types';

export interface BerryProps {
	id: number;
	name: string;
	spriteUrl: string | null;
	firmness: BerryFirmness;
	flavorPotencyMap: FlavorPotencyMap;
}

export class Berry {
	readonly id: number;
	readonly name: string;
	readonly spriteUrl: string | null;
	readonly firmness: BerryFirmness;
	readonly flavorPotencyMap: FlavorPotencyMap;

	constructor(props: BerryProps) {
		this.id = props.id;
		this.name = props.name;
		this.spriteUrl = props.spriteUrl;
		this.firmness = props.firmness;
		this.flavorPotencyMap = props.flavorPotencyMap;
	}

	prettyPrintName(): string {
		return this.name.charAt(0).toUpperCase() + this.name.slice(1);
	}

	prettyPrintFirmness(): string {
		return this.firmness.replace('-', ' ');
	}

	prettyPrintFlavorPotencyMap(): string {
		return Object.entries(this.flavorPotencyMap)
			.map(
				([key, value]) =>
					`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
			)
			.join(', ');
	}
}
