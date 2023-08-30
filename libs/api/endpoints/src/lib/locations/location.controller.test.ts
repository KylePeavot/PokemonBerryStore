import request from 'supertest';
import { GetLocationsListResponse } from '@pokemon-berry-store/shared/request-types';

describe('Location controller', () => {
	describe('GET /locations', () => {
		it('should return a list of location names', async () => {
			//When
			const response = await request('localhost:3000').get('/locations');

			//Then
			expect(response.status).toBe(200);

			const responseBodyAsType: GetLocationsListResponse = response.body;

			expect(responseBodyAsType.locationNames.length).toBe(850);
			expect(responseBodyAsType.locationNames).toStrictEqual(
				expect.arrayContaining([
					'canalave-city',
					'eterna-city',
					'pastoria-city',
				])
			);
		});
	});
});
