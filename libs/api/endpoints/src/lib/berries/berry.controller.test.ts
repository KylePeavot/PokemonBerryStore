import request from 'supertest';
import { GetBerriesListResponse } from '@pokemon-berry-store/shared/request-types';

describe('Berry controller', () => {
	describe('GET /berries', () => {
		beforeEach(() => {
			// const localBerriesListFileLocation = 'localBerriesList.json';
			// try {
			//
			//TODO this absolutely does not work right now. Leaving until
			// application built and run on each test run because testing by
			// manually rebuilding each code change is slow
			// 	fs.unlinkSync(localBerriesListFileLocation);
			//
			// } catch (e) {
			// 	console.log('localBerriesList.json not found, continuing');
			// }
		});

		it('should return a list of berries', async () => {
			//When
			//TODO move localhost:3000 into config
			//TODO spin up api as part of testing process
			const response = await request('localhost:3000').get('/berries');

			//Then
			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual<GetBerriesListResponse>({
				count: 64,
				berries: expect.arrayContaining([
					{
						id: 53,
						name: 'liechi',
						spriteUrl:
							'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/liechi-berry.png',
						firmness: 'very-hard',
						flavorPotencyMap: {
							spicy: 30,
							dry: 10,
							sweet: 30,
							bitter: 0,
							sour: 0,
						},
						priceInPence: 5100,
					},
				]),
			});
		});
	});
});
