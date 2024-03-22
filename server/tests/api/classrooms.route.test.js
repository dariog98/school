import testServer from '../../src/utils/testServer.js'
import ClassroomRouter from '../../src/routes/classrooms.js'
/*
jest.mock('../controller/classroomControllers.js', () => ({
    getAllClassrooms: jest.fn(() => ['1', '2'])
}))
*/
describe('classrooms tests', () => {
    describe('GET /classrooms', () => {
        let response
        beforeEach(async () => {
            response = await testServer(ClassroomRouter).get('/classrooms').send()
        })

        it('should return a response with status 200', () => {
            const expected = 200

            const { status } = response
            const result = status

            expect(result).toBe(expected)
        })

        it('should return an array', () => {
            expect(response.body.data).toBeInstanceOf(Array)
        })
    })
})