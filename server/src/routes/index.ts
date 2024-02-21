import { Router } from 'express'
import StudentRouter from './students'
import ClassroomRouter from './classrooms'
import UserRouter from './users'

import { ClientError } from '../constants/errors'

const router = Router()
router.use('/students', StudentRouter)
router.use('/classrooms', ClassroomRouter)
router.use('/users', UserRouter)

router.get('*', () => {
    throw new ClientError('Route not found', 404)
})

export default router
