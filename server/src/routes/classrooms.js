import { Router } from 'express'
import ClassroomControllers from '../controller/classroomControllers.js'

const router = Router()

router.get('/', ClassroomControllers.getAllClassrooms)
router.post('/', ClassroomControllers.createClassroom)
router.patch('/:id', ClassroomControllers.updateClassroom)

router.get('/:id', ClassroomControllers.getClassroom)
router.get('/:id/students', ClassroomControllers.getClassroomStudents)
//router.get('/:id/students/:student', ClassroomControllers.getClassroomStudent)
router.post('/:id/students/:student', ClassroomControllers.addStudentToClassroom)
router.delete('/:id/students/:student', ClassroomControllers.removeStudentToClassroom)

router.post('/:id/professors/:professor', ClassroomControllers.addProfessorToClassroom)
router.delete('/:id/professors/:professor', ClassroomControllers.removeProfessorToClassroom)

router.get('/:id/attendances', ClassroomControllers.getClassroomAttendance)
router.post('/:id/attendances', ClassroomControllers.saveClassroomAttendance)

router.get('/:id/tests', ClassroomControllers.getClassroomTests)
router.post('/:id/tests', ClassroomControllers.createClassroomTest)

router.get('/:id/tests/:test', ClassroomControllers.getClassroomTest)
router.patch('/:id/tests/:test', ClassroomControllers.updateClassroomTest)

export default (app) => app.use('/classrooms', router)