import fs from 'fs';
import {PokeApiDriver} from "../../drivers/PokeApi.driver";

interface BerriesList {
    count: number;
    berries: {
        id: number;
        name: string;
    }[];
}

export class BerryController {
    private pokeApiDriver: PokeApiDriver;

    constructor() {
        this.pokeApiDriver = new PokeApiDriver();
    }


    getBerries = async (req, res, next) => {
        const berries = await this.getBerriesFromLocalFileOrElseApi();

        return res.status(200).json(berries).end();
    }

    private async getBerriesFromLocalFileOrElseApi(): Promise<BerriesList> {
        try {
            //Try to get a file called localBerriesList.json
            //If it doesn't exist, then call the API
            //If it does exist, then return the contents of the file

            //TODO find a better place to store this
            const localBerriesListFile = await fs.promises.readFile('localBerriesList.json');
            const berriesListJson = JSON.parse(localBerriesListFile.toString());

            return berriesListJson.map((berry) => ({
                id: berry.id,
                name: berry.name,
            }))
        } catch (e) {
            //INFO: We assume here that this error has been thrown because the file doesn't exist
            console.warn({msg: 'No local berries list found, calling API instead', e});

            const berries = await this.buildBerriesListFromApi();

            await fs.promises.writeFile('localBerriesList.json', JSON.stringify(berries.berries));
        }
    }

    //TODO move this to a service or the driver itself
    private async buildBerriesListFromApi(): Promise<BerriesList> {
        const paginatedBerries = await this.pokeApiDriver.getBerries();

        const berries = await Promise.all(paginatedBerries.results.map(async (berry) => {
            const berryData = await this.pokeApiDriver.getBerryById(berry.name);
            const itemData = await this.pokeApiDriver.getItemById(berryData.item.name);

            return {
                id: berryData.id,
                name: berryData.name,
                spriteUrl: itemData.sprites.default,
            }
        }));

        return {
            count: berries.length,
            berries,
        }

    }

}