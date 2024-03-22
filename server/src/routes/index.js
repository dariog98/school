import { Router } from 'express'
import { ClientError } from '../constants/errors.js'
import ClassroomRouter from './classrooms.js'
import UserRouter from './users.js'

const router = Router()
ClassroomRouter(router)
UserRouter(router)

router.get('*', () => {
    throw new ClientError('Route not found', 404)
})

export default (app) => app.use(router)
