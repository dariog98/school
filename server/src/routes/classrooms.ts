import { Router } from 'express'
import ClassroomControllers from '../controller/classroomControllers'

const router = Router()

router.get('/', ClassroomControllers.getAllClassrooms)
router.post('/', ClassroomControllers.createClassroom)

router.get('/:id', ClassroomControllers.getClassroom)
router.get('/:id/students', ClassroomControllers.getClassroomStudents)
router.get('/:id/students/:student', ClassroomControllers.getClassroomStudent)

router.get('/:id/attendances', ClassroomControllers.getClassroomAttendance)
router.post('/:id/attendances', ClassroomControllers.saveClassroomAttendance)

router.get('/:id/tests', ClassroomControllers.getClassroomTests)
router.post('/:id/tests', ClassroomControllers.createClassroomTest)

export default router