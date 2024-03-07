import { Router } from 'express'
import { ClientError } from '../constants/errors.js'
import ClassroomRouter from './classrooms.js'
import UserRouter from './users.js'

const router = Router()
router.use('/classrooms', ClassroomRouter)
router.use('/users', UserRouter)

router.get('*', () => {
    throw new ClientError('Route not found', 404)
})

export default router
