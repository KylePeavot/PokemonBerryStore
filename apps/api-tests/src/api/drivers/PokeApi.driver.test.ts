import {PokeApiDriver} from "../../../../api/src/drivers/PokeApi.driver";
import {NamedAPIResourceList} from "pokedex-promise-v2";

describe('PokeApi Driver', () => {
    let pokeApiDriver = new PokeApiDriver();

    describe('getBerries', () => {
        it('should return a list of berries', async () => {
            //When
            const berries = await pokeApiDriver.getBerries();

            //Then
            expect(berries).toStrictEqual<NamedAPIResourceList>({
                count: 64,
                next: null,
                previous: null,
                results: expect.arrayContaining([
                    expect.objectContaining({
                        name: 'cheri',
                        url: "https://pokeapi.co/api/v2/berry/1/",
                    })
                ]),
            })
        })
    });

    describe('getBerryById', () => {
        it('should return berry data if berry exists', async () => {
            //When
            const berryById = await pokeApiDriver.getBerryById('1');
            const berryByName = await pokeApiDriver.getBerryById('cheri');

            //Then
            expect(berryById).toStrictEqual(berryByName);
            expect(berryById).toStrictEqual(expect.objectContaining({
                id: 1,
                name: 'cheri',
            }));
        });

        it('should throw an error if berry does not exist', async () => {
            //When/Then
            await expect(async () => await pokeApiDriver.getBerryById('a-non-existent-berry'))
                .rejects.toThrowError('Request failed with status code 404');
        });
    });

    describe('getItemById', () => {
        it('should return item data if item exists', async () => {
            //When
            const item = await pokeApiDriver.getItemById('126');

            //Then
            expect(item).toStrictEqual(expect.objectContaining({
                id: 126,
                name: 'cheri-berry',
            }));
        });

        it('should throw an error if berry does not exist', async () => {
            //When/Then
            await expect(async () => await pokeApiDriver.getItemById('a-non-existent-item-id'))
                .rejects.toThrowError('Request failed with status code 404');
        });
    });
});