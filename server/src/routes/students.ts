import { Router } from 'express'
import StudentControllers from '../controller/studentControllers'

const router = Router()

router.get('/', StudentControllers.getAllStudents)
router.get('/:id', StudentControllers.getStudent)
router.post('/', StudentControllers.createStudent)

export default router