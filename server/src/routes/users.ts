import { Router } from 'express'
import UserControllers from '../controller/userControllers'

const router = Router()

router.get('/:id', UserControllers.getUser)
router.post('/login', UserControllers.loginUser)
router.patch('/', UserControllers.updateUser)

export default router