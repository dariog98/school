import { RoutesAPI } from '../constants/api'
import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'

const loginUser = async (data) => {
    const url = RoutesAPI.Login
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data })
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
    const url = RoutesAPI.UserUpdate
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
    getUser
}

export default UserServices