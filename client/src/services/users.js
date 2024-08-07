import { RoutesAPI } from '../constants/api'
import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'

const loginUser = async (data) => {
    const url = RoutesAPI.Login
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data })
    const response = await fetch(request)
    return await response.json()
}

const createStudent = async (data) => {
    const url = `${RoutesAPI.Register}/student`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data })
    const response = await fetch(request)
    return await response.json()
}

const createProfessor = async (data) => {
    const url = `${RoutesAPI.Register}/professor`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createAdmin = async (data) => {
    const url = `${RoutesAPI.Register}/admin`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const changePassword = async (data) => {
    const url = RoutesAPI.Password
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateUser = async (data) => {
    const url = RoutesAPI.Users
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getUser = async ({ idUser }) => {
    const url = `${RoutesAPI.Users}/${idUser}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const UserServices = {
    loginUser,
    getUser,
    updateUser,
    createAdmin,
    createProfessor,
    createStudent
}

export default UserServices