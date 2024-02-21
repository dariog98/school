import { Router } from 'express'
import ClassroomControllers from '../controller/classroomControllers'

const router = Router()

router.get('/', ClassroomControllers.getAllClassrooms)
router.post('/', ClassroomControllers.createClassroom)

router.get('/:id', ClassroomControllers.getClassroom)
router.get('/:id/students', ClassroomControllers.getClassroomStudents)

router.get('/:id/attendances', ClassroomControllers.getClassroomAttendance)
router.post('/:id/attendances', ClassroomControllers.saveClassroomAttendance)

export default router