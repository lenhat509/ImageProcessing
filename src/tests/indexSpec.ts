import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe("Testing api/images", () => {
    it("Expecting 200 status", async () => {
        const response = await request.get('/api/images?filename=aircraft&width=200&height=200');
        expect(response.status).toEqual(200);
    })
    it("Expecting 404 status", async () => {
        const response = await request.get('/api/images?filename=god&width=200&height=200');
        expect(response.status).toEqual(404);
    })
})