import request from 'supertest';
import * as fs from "fs";

describe('Berry controller', () => {
    describe('GET /berries', () => {
        beforeEach(() => {
            try {
                fs.unlink('./apps/api/src/assets/localBerriesList.json', () => console.log('localBerriesList.json deleted before test'));
            } catch (e) {
                console.log('localBerriesList.json not found, continuing');
            }
        })

        it('should return a list of berries', async () => {
            //When
            //TODO move localhost:3000 into config
            //TODO spin up api as part of testing process
            const response = await request('localhost:3000').get('/berries');

            //Then
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({
                count: 64,
                berries: expect.arrayContaining([
                    {
                        id: 53,
                        name: 'liechi',
                        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/liechi-berry.png"
                    }
                ]),
            });

            /** TODO: Move properties into test as needed
             *            description: 'Held in battle: When the holder has 1/4 its max HP remaining or less, it consumes this item to raise its Attack by one stage.',
             *            flavours: [
             *                {
             *                    name: 'spicy',
             *                    potency: 30
             *                },
             *                {
             *                    name: 'sweet',
             *                    potency: 30
             *                },
             *                {
             *                    name: 'dry',
             *                    potency: 10
             *                }
             *            ],
             *            firmness: 'very-hard',
             *            spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/liechi-berry.png'
             */
        });
    });
});
