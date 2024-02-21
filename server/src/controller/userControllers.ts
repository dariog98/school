import { Request, Response } from 'express'
import { sendResponse } from '../utils/handleResponse'
import { UserServices } from '../services/index'
import { catchedAsync } from '../utils/catchedAsync'
import { ClientError } from '../constants/errors'

const loginUser = async (request: Request, response: Response) => {
    const { username, password } = request.body
    const user = await UserServices.loginUser(username, password)
    sendResponse({ response, statusCode: 200, data: user })
}

const getUser = async (request: Request, response: Response) => {
    const idUser = Number(request.params.id)
    const user = await UserServices.getUserById(idUser)
    if (!user) throw new ClientError('User not found', 404)    
    sendResponse({ response, statusCode: 200, data: user })
}

const UserControllers = {
    loginUser: catchedAsync(loginUser),
    getUser: catchedAsync(getUser)
}

export default UserControllers