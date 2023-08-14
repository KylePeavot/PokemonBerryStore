import request from 'supertest';

describe('Berry controller', () => {
    describe('GET /berries', () => {
        it('should return a list of berries', async () => {
            //When
            const response = await request('localhost:3000').get('/berries');

            //Then
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({
                test: [],
            })
        });
    });
});
