import { Router } from 'express'
import { ClientError } from '../constants/errors'
import ClassroomRouter from './classrooms'
import UserRouter from './users'

const router = Router()
router.use('/classrooms', ClassroomRouter)
router.use('/users', UserRouter)

router.get('*', () => {
    throw new ClientError('Route not found', 404)
})

export default router
