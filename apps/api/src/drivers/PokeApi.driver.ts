import {Berry, Item, NamedAPIResourceList} from 'pokedex-promise-v2'
import axios from "axios";

export class PokeApiDriver {

    async getBerries(pageSize = 1000): Promise<NamedAPIResourceList> {
        const response = await axios
            .get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/berry?limit=${pageSize}`);

        return response.data;
    }

    async getBerryById(idOrName: string): Promise<Berry> {
        const response = await axios.get<Berry>(`https://pokeapi.co/api/v2/berry/${idOrName}`);

        return response.data;
    }

    async getItemById(id: string): Promise<Item> {
        const response = await axios.get<Item>(`https://pokeapi.co/api/v2/item/${id}`);

        return response.data;
    }
}