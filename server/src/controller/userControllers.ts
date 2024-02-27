import { Request, Response } from 'express'
import { sendResponse } from '../utils/handleResponse'
import { UserServices } from '../services/index'
import { catchedAsync } from '../utils/catchedAsync'
import { ClientError } from '../constants/errors'
import { getTokenFromRequest } from '../utils/handleToken'

const loginUser = async (request: Request, response: Response) => {
    const { username, password } = request.body
    const user = await UserServices.loginUser(username, password)
    sendResponse({ response, statusCode: 200, data: user })
}

const updateUser = async (request: Request, response: Response) => {
    const { idUser } = await getTokenFromRequest(request)
    const { surnames, names, dni, birthdate, phone, address } = request.body
    const data = await UserServices.updateUser(idUser, surnames, names, dni, birthdate, phone, address)
    sendResponse({ response, statusCode: 200, message: 'User edited successfully', data })
}

const getUser = async (request: Request, response: Response) => {
    const idUser = Number(request.params.id)
    const user = await UserServices.getUserById(idUser)
    if (!user) throw new ClientError('User not found', 404)    
    sendResponse({ response, statusCode: 200, data: user })
}

const UserControllers = {
    loginUser: catchedAsync(loginUser),
    getUser: catchedAsync(getUser),
    updateUser: catchedAsync(updateUser),
}

export default UserControllers