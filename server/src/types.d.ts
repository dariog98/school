import { Response } from 'express'

export interface User {
    id: number
    username: string
    password: string
    names: string
    surnames: string
    mail: string
    dni: string
    birthdate: string
    address?: string,
    phone?: string,
}

export type NonSensitiveInfoUser = Omit<User, 'password'>

export interface Student {
    id: string
    names: string
    surnames: string
    birthdate: string
}

export interface Classroom {
    id: string,
    description: string,
    students: Student[],
    //profesors: Profesor[]
}

export interface ResponseBody {
    response: Response
    statusCode: number
    message?: string
    data?: any
    status?: number
    total?: number
    totalPages?: number
}

export interface ErrorResponseBody {
    response: Response
    statusCode: number
    errorCode: number | undefined
    message: string 
}