import { Request, Response } from 'express'
import { StudentServices } from '../services/index'
import { sendResponse } from '../utils/handleResponse'
import { ResponseBody } from '../types'
import { ClientError } from '../constants/errors'

const getAllStudents = (_request: Request, response: Response): void => {
    response.send(StudentServices.getAllStudents())
}

const getStudent = (request: Request, response: Response): void => {
    const idStudent = request.params.id
    const student = StudentServices.getStudent(idStudent)
    if (!student) throw new ClientError('Student not found', 404)
    const responseBody: ResponseBody = { response, statusCode: 200, data: student, message: '' }
    sendResponse(responseBody)
}

const createStudent = (request: Request, response: Response): void => {
    const { names, surnames, birthdate } = request.body
    response.send(StudentServices.createStudent(names, surnames, birthdate))
}

const StudentControllers = {
    getAllStudents,
    getStudent,
    createStudent
}

export default StudentControllers