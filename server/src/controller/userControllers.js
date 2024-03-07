import { sendResponse } from '../utils/handleResponse.js'
import { UserServices } from '../services/index.js'
import { catchedAsync } from '../utils/catchedAsync.js'
import { ClientError } from '../constants/errors.js'
import { getTokenFromRequest } from '../utils/handleToken.js'

const loginUser = async (request, response) => {
    const { username, password } = request.body
    const user = await UserServices.loginUser(username, password)
    sendResponse({ response, statusCode: 200, data: user })
}

const updateUser = async (request, response) => {
    const { idUser } = await getTokenFromRequest(request)
    const { surnames, names, dni, birthdate, phone, address } = request.body
    const data = await UserServices.updateUser(idUser, surnames, names, dni, birthdate, phone, address)
    sendResponse({ response, statusCode: 200, message: 'User edited successfully', data })
}

const getUser = async (request, response) => {
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