import { Request, Response } from 'express'
import { ClassroomServices } from '../services/index'
import { sendResponse } from '../utils/handleResponse'
import { ResponseBody } from '../types'
import { ClientError } from '../constants/errors'
import { catchedAsync } from '../utils/catchedAsync'

const getAllClassrooms = async (_request: Request, response: Response): void => {
    const classrooms = await ClassroomServices.getAllClassrooms()
    const responseBody: ResponseBody = { response, statusCode: 200, data: classrooms }
    sendResponse(responseBody)
}

const getClassroom = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const classroom = await ClassroomServices.getClassroomById(idClassroom)
    if (!classroom) throw new ClientError('Classroom not found', 404)    
    sendResponse({ response, statusCode: 200, data: classroom })
}

const getClassroomStudents = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const { total, data }= await ClassroomServices.getClassroomStudents(idClassroom, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, data, total })
}

const getClassroomStudent = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    const student = await ClassroomServices.getClassroomStudent(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, data: student })
}

const createClassroom = async (request: Request, response: Response): void => {
    const { description } = request.body
    await ClassroomServices.createClassroom(description)
    sendResponse({ response, statusCode: 201, message: 'Classroom created sucessfully' })
}

const getClassroomAttendance = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const { date } = request.query
    const { total, data }= await ClassroomServices.getClassroomAttendance(idClassroom, date, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, total, data })
}

const saveClassroomAttendance = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const { date, attendances } = request.body
    await ClassroomServices.saveClassroomAttendance(idClassroom, date, attendances)
    sendResponse({ response, statusCode: 200, message: 'Classroom attendances saved sucessfully' })
}

const getClassroomTests = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const { date } = request.query
    const { total, data }= await ClassroomServices.getClassroomTests(idClassroom, ['id', 'ASC'])
    sendResponse({ response, statusCode: 200, total, data })
}

const createClassroomTest = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const { description, date, students } = request.body
    await ClassroomServices.createClassroomTest(idClassroom, description, date, students ?? [])
    sendResponse({ response, statusCode: 201, message: 'Test created sucessfully' })
}

const addStudentToClassroom = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    await ClassroomServices.addStudentToClassroom(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, message: 'Student added sucessfully' })
}

const removeStudentToClassroom = async (request: Request, response: Response): void => {
    const idClassroom = Number(request.params.id)
    const idStudent = Number(request.params.student)
    await ClassroomServices.removeStudentToClassroom(idClassroom, idStudent)
    sendResponse({ response, statusCode: 200, message: 'Student removed sucessfully' })
}

const ClassroomControllers = {
    getAllClassrooms: catchedAsync(getAllClassrooms),
    getClassroom: catchedAsync(getClassroom),
    getClassroomStudents: catchedAsync(getClassroomStudents),
    getClassroomStudent: catchedAsync(getClassroomStudent),
    createClassroom: catchedAsync(createClassroom),
    getClassroomAttendance: catchedAsync(getClassroomAttendance),
    saveClassroomAttendance: catchedAsync(saveClassroomAttendance),
    getClassroomTests: catchedAsync(getClassroomTests),
    createClassroomTest: catchedAsync(createClassroomTest),
    addStudentToClassroom: catchedAsync(addStudentToClassroom),
    removeStudentToClassroom: catchedAsync(removeStudentToClassroom),
}

export default ClassroomControllers