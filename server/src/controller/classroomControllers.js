import { ClassroomServices } from '../services/index.js'
import { sendResponse } from '../utils/handleResponse.js'
import { ClientError } from '../constants/errors.js'
import { catchedAsync } from '../utils/catchedAsync.js'

const getAllClassrooms = async (request, response) => {
    const { search } = request.query
    const classrooms = await ClassroomServices.getAllClassrooms(search)
    const responseBody = { response, statusCode: 200, data: classrooms }
    sendResponse(responseBody)
}

const getClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const classroom = await ClassroomServices.getClassroomById(idClassroom)
    if (!classroom) throw new ClientError('Classroom not found', 404)    
    sendResponse({ response, statusCode: 200, data: classroom })
}

const getClassroomStudents = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { search } = request.query
    const { total, data }= await ClassroomServices.getClassroomStudents(idClassroom, search, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, data, total })
}

const getClassroomStudent = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    const student = await ClassroomServices.getClassroomStudent(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, data: student })
}

const createClassroom = async (request, response) => {
    const { description } = request.body
    await ClassroomServices.createClassroom(description)
    sendResponse({ response, statusCode: 201, message: 'Classroom created sucessfully' })
}

const updateClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { description } = request.body
    await ClassroomServices.updateClassroom(idClassroom, description)
    sendResponse({ response, statusCode: 200, message: 'Classroom updated sucessfully' })
}

const getClassroomAttendance = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { date } = request.query
    const { total, data }= await ClassroomServices.getClassroomAttendance(idClassroom, date, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, total, data })
}

const saveClassroomAttendance = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { date, attendances } = request.body
    await ClassroomServices.saveClassroomAttendance(idClassroom, date, attendances)
    sendResponse({ response, statusCode: 200, message: 'Classroom attendances saved sucessfully' })
}

const getClassroomTests = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { date } = request.query
    const { total, data }= await ClassroomServices.getClassroomTests(idClassroom, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, total, data })
}

const getClassroomTest = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idTest = Number(request.params.test)
    const data = await ClassroomServices.getClassroomTest(idClassroom, idTest)
    sendResponse({ response, statusCode: 200, data })
}

const createClassroomTest = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const { description, date, students } = request.body
    await ClassroomServices.createClassroomTest(idClassroom, description, date, students ?? [])
    sendResponse({ response, statusCode: 201, message: 'Test created sucessfully' })
}

const updateClassroomTest = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idTest = Number(request.params.test)
    const { description, date, students } = request.body
    await ClassroomServices.updateClassroomTest(idClassroom, idTest, description, date, students ?? [])
    sendResponse({ response, statusCode: 200, message: 'Test updated sucessfully' })
}

const addStudentToClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    await ClassroomServices.addStudentToClassroom(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, message: 'Student added sucessfully' })
}

const removeStudentToClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    await ClassroomServices.removeStudentToClassroom(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, message: 'Student removed sucessfully' })
}

const addProfessorToClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idProfessor = Number(request.params.professor)
    await ClassroomServices.addProfessorToClassroom(idClassroom, idProfessor)
    sendResponse({ response, statusCode: 200, message: 'Professor added sucessfully' })
}

const removeProfessorToClassroom = async (request, response) => {
    const idClassroom = Number(request.params.id)
    const idProfessor = Number(request.params.professor)
    await ClassroomServices.removeProfessorToClassroom(idClassroom, idProfessor)
    sendResponse({ response, statusCode: 200, message: 'Professor removed sucessfully' })
}

const ClassroomControllers = {
    getAllClassrooms: catchedAsync(getAllClassrooms),
    getClassroom: catchedAsync(getClassroom),
    getClassroomStudents: catchedAsync(getClassroomStudents),
    getClassroomStudent: catchedAsync(getClassroomStudent),
    createClassroom: catchedAsync(createClassroom),
    updateClassroom: catchedAsync(updateClassroom),
    getClassroomAttendance: catchedAsync(getClassroomAttendance),
    saveClassroomAttendance: catchedAsync(saveClassroomAttendance),
    getClassroomTests: catchedAsync(getClassroomTests),
    getClassroomTest: catchedAsync(getClassroomTest),
    createClassroomTest: catchedAsync(createClassroomTest),
    updateClassroomTest: catchedAsync(updateClassroomTest),
    addStudentToClassroom: catchedAsync(addStudentToClassroom),
    removeStudentToClassroom: catchedAsync(removeStudentToClassroom),
    addProfessorToClassroom: catchedAsync(addProfessorToClassroom),
    removeProfessorToClassroom: catchedAsync(removeProfessorToClassroom),
}

export default ClassroomControllers