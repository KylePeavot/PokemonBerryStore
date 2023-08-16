import fs from 'fs';
import { PokeApiDriver } from '../../drivers/PokeApi.driver';
import { NextFunction, Request, Response } from 'express';

interface BerriesList {
	count: number;
	berries: {
		id: number;
		name: string;
		spriteUrl: string | null;
	}[];
	firmness: 'very-soft' | 'soft' | 'hard' | 'very-hard' | 'super-hard';
	flavorPotencyMap: {
		spicy: number;
		dry: number;
		sweet: number;
		bitter: number;
		sour: number;
	};
}

export class BerryController {
	private pokeApiDriver: PokeApiDriver;

	constructor() {
		this.pokeApiDriver = new PokeApiDriver();
	}

	getBerries = async (req: Request, res: Response, next: NextFunction) => {
		const berries = await this.getBerriesFromLocalFileOrElseApi();

		return res.status(200).json(berries).end();
	};

	private async getBerriesFromLocalFileOrElseApi(): Promise<BerriesList> {
		try {
			//TODO move this file reading/writing to a util
			const localBerriesListFile = await fs.promises.readFile(
				'./apps/api/src/assets/localBerriesList.json'
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
				await fs.promises.writeFile(
					'./apps/api/src/assets/localBerriesList.json',
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
	private async buildBerriesListFromApi(): Promise<BerriesList> {
		const paginatedBerries = await this.pokeApiDriver.getBerries();

		const berries = await Promise.all(
			paginatedBerries.results.map(async (berry) => {
				const berryData = await this.pokeApiDriver.getBerryById(
					berry.name
				);
				const itemData = await this.pokeApiDriver.getItemById(
					berryData.item.name
				);

				return {
					id: berryData.id,
					name: berryData.name,
					spriteUrl: itemData.sprites.default,
				};
			})
		);

		return {
			count: berries.length,
			berries,
		};
	}
}
