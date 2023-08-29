import { NextFunction, Request, Response } from 'express';
import { PokeApiDriver } from '@pokemon-berry-store/api/drivers';
import * as fs from 'fs';
import {
	BerryFirmness,
	GetBerriesListResponse,
} from '@pokemon-berry-store/shared/request-types';

export class BerryController {
	private pokeApiDriver: PokeApiDriver;

	constructor() {
		this.pokeApiDriver = new PokeApiDriver();
	}

	getBerries = async (req: Request, res: Response, next: NextFunction) => {
		const berries = await this.getBerriesFromLocalFileOrElseApi();

		return res.status(200).json(berries).end();
	};

	private async getBerriesFromLocalFileOrElseApi(): Promise<GetBerriesListResponse> {
		const localBerriesListFileLocation = 'localBerriesList.json';

		try {
			//TODO move this file reading/writing to a util
			const localBerriesListFile = fs.readFileSync(
				localBerriesListFileLocation
			);
			return JSON.parse(localBerriesListFile.toString());
		} catch (e) {
			//INFO: We assume here that this error has been thrown because the file doesn't exist
			console.warn({
				msg: 'No local berries list found, calling API instead',
				e,
			});

			const berries = await this.buildBerriesListFromApi();

			try {
				fs.writeFileSync(
					localBerriesListFileLocation,
					JSON.stringify(berries)
				);
			} catch (e) {
				console.error({
					msg: 'Failed to write local berries list file',
					e,
				});

				throw e;
			}

			return berries;
		}
	}

	//TODO move this to a service or the driver itself
	private async buildBerriesListFromApi(): Promise<GetBerriesListResponse> {
		const paginatedBerries = await this.pokeApiDriver.getBerries();

		const berries = await Promise.all(
			paginatedBerries.results.map(async (berry) => {
				const berryData = await this.pokeApiDriver.getBerryById(
					berry.name
				);
				const itemData = await this.pokeApiDriver.getItemById(
					berryData.item.name
				);

				const spicyPotency: number =
					berryData.flavors.find(
						(flavor) => flavor.flavor.name === 'spicy'
					)?.potency ?? 0;
				const dryPotency: number =
					berryData.flavors.find(
						(flavor) => flavor.flavor.name === 'dry'
					)?.potency ?? 0;
				const sweetPotency: number =
					berryData.flavors.find(
						(flavor) => flavor.flavor.name === 'sweet'
					)?.potency ?? 0;
				const bitterPotency: number =
					berryData.flavors.find(
						(flavor) => flavor.flavor.name === 'bitter'
					)?.potency ?? 0;
				const sourPotency: number =
					berryData.flavors.find(
						(flavor) => flavor.flavor.name === 'sour'
					)?.potency ?? 0;

				const k = 1;
				const priceInPence =
					Math.floor(
						(k *
							(spicyPotency +
								dryPotency +
								sweetPotency +
								bitterPotency +
								sourPotency)) /
							5
					) * 100;

				return {
					id: berryData.id,
					name: berryData.name,
					spriteUrl: itemData.sprites.default as string,
					firmness: berryData.firmness.name as BerryFirmness,
					flavorPotencyMap: {
						spicy: spicyPotency,
						dry: dryPotency,
						sweet: sweetPotency,
						bitter: bitterPotency,
						sour: sourPotency,
					},
					priceInPence,
				};
			})
		);

		return {
			count: berries.length,
			berries,
		};
	}
}
