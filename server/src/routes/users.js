import { Router } from 'express'
import UserControllers from '../controller/userControllers.js'

const router = Router()

router.get('/:id', UserControllers.getUser)
router.post('/login', UserControllers.loginUser)
router.patch('/', UserControllers.updateUser)

router.post('/register/admin', UserControllers.createAdmin)
router.post('/register/professor', UserControllers.createProfessor)
router.post('/register/student', UserControllers.createStudent)

export default (app) => app.use('/users', router)