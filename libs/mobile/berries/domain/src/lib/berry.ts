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
	priceInPence: number;
}

export class Berry {
	readonly id: number;
	readonly name: string;
	readonly spriteUrl: string | null;
	readonly firmness: BerryFirmness;
	readonly flavorPotencyMap: FlavorPotencyMap;
	readonly priceInPence: number;

	constructor(props: BerryProps) {
		this.id = props.id;
		this.name = props.name;
		this.spriteUrl = props.spriteUrl;
		this.firmness = props.firmness;
		this.flavorPotencyMap = props.flavorPotencyMap;
		this.priceInPence = props.priceInPence;
	}

	prettyPrintName(): string {
		return this.name.charAt(0).toUpperCase() + this.name.slice(1);
	}

	prettyPrintFirmness(): string {
		const words = this.firmness.split('-');

		words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

		return words.join(' ');
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
