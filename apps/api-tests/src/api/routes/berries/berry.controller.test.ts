import request from 'supertest';

describe('Berry controller', () => {
    describe('GET /berries', () => {
        it('should return a list of berries', async () => {
            //When
            //TODO move localhost:3000 into config
            //TODO spin up api as part of testing process
            const response = await request('localhost:3000').get('/berries');

            //Then
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({
                total: 64,
                berries: expect.arrayContaining([
                    {
                        id: 53,
                        name: 'liechi',
                    }
                ]),
            })

            /**
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
