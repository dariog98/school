import { request } from 'supertest'
import app from '../src/app'

describe('Testing classrooms routes', () => {
    describe('GET /classrooms', () => {
        it('should return status 200', async () => {
            const response = await request(app).get('/classrooms').send()
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json')
        })
    })
})