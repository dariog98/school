import { sendResponse } from '../utils/handleResponse.js'
import { UserServices } from '../services/index.js'
import { catchedAsync } from '../utils/catchedAsync.js'
import { ClientError } from '../constants/errors.js'
import { getTokenFromRequest } from '../utils/handleToken.js'
import { USER_ROLES } from '../constants/userRoles.js'

const loginUser = async (request, response) => {
    const { username, password } = request.body
    const user = await UserServices.loginUser(username, password)
    sendResponse({ response, statusCode: 200, content: { data: user } })
}

const updateUser = async (request, response) => {
    const { idUser } = await getTokenFromRequest(request)
    const { surnames, names, dni, birthdate, phone, address } = request.body
    const data = await UserServices.updateUser(idUser, surnames, names, dni, birthdate, phone, address)
    sendResponse({ response, statusCode: 200, message: 'User edited successfully', content: { data } })
}

const getUser = async (request, response) => {
    const idUser = Number(request.params.id)
    const user = await UserServices.getUserById(idUser)
    if (!user) throw new ClientError('User not found', 404)    
    sendResponse({ response, statusCode: 200, content: { data: user } })
}

const createAdmin = async (request, response) => {
    const { surnames, names, username, password, dni, mail, birthdate, phone, address } = request.body
    const idRole = USER_ROLES.Admin
    const data = await UserServices.createUser(surnames, names, username, password, dni, mail, birthdate, phone, address, idRole) 
    sendResponse({ response, statusCode: 201, message: 'New admin created successfully' })
}

const createProfessor = async (request, response) => {
    const { surnames, names, username, password, dni, mail, birthdate, phone, address } = request.body
    const idRole = USER_ROLES.Professor
    const data = await UserServices.createUser(surnames, names, username, password, dni, mail, birthdate, phone, address, idRole)
    sendResponse({ response, statusCode: 201, message: 'New professor created successfully' })
}

const createStudent = async (request, response) => {
    const { surnames, names, username, password, dni, mail, birthdate, phone, address } = request.body
    const idRole = USER_ROLES.Student
    console.log(request.body)
    const data = await UserServices.createUser(surnames, names, username, password, dni, mail, birthdate, phone, address, idRole)
    sendResponse({ response, statusCode: 201, message: 'New student created successfully' })
}

const UserControllers = {
    loginUser: catchedAsync(loginUser),
    getUser: catchedAsync(getUser),
    updateUser: catchedAsync(updateUser),
    createAdmin: catchedAsync(createAdmin),
    createProfessor: catchedAsync(createProfessor),
    createStudent: catchedAsync(createStudent),
}

export default UserControllers