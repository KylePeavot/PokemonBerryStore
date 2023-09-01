import { Request, Response } from 'express';
import { PokeApiDriver } from '@pokemon-berry-store/api/drivers';
import { GetLocationsListResponse } from '@pokemon-berry-store/shared/request-types';
import fs from 'fs';

export class LocationController {
	private pokeApiDriver: PokeApiDriver;

	constructor() {
		this.pokeApiDriver = new PokeApiDriver();
	}

	getLocations = async (req: Request, res: Response) => {
		const locations = await this.getLocationsFromLocalFileOrElseApi();

		return res.status(200).json(locations).end();
	};

	private async getLocationsFromLocalFileOrElseApi(): Promise<GetLocationsListResponse> {
		const localLocationsListFileLocation = 'localLocationsList.json';

		try {
			//TODO move this file reading/writing to a util
			const localLocationsListFile = fs.readFileSync(
				localLocationsListFileLocation
			);
			return JSON.parse(localLocationsListFile.toString());
		} catch (e) {
			//INFO: We assume here that this error has been thrown because the file doesn't exist
			console.warn({
				msg: 'No local locations list found, calling API instead',
				e,
			});

			const locations = await this.buildLocationsListFromApi();

			try {
				fs.writeFileSync(
					localLocationsListFileLocation,
					JSON.stringify(locations)
				);
			} catch (e) {
				console.error({
					msg: 'Failed to write local locations list file',
					e,
				});

				throw e;
			}

			return locations;
		}
	}

	private async buildLocationsListFromApi(): Promise<GetLocationsListResponse> {
		const locationsAsNamedAPIResources =
			await this.pokeApiDriver.getLocations();

		return {
			locationNames: locationsAsNamedAPIResources.map(
				(location) => location.name
			),
		};
	}
}
