import { RoutesAPI } from '../constants/api'
import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'

const getAllSubjects = async ({ search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RoutesAPI.Subjects}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubject = async ({ idClass }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubjectAttendance = async ({ idClass, date }) => {
    const params = new URLSearchParams({
        date: date,
    })

    const url = `${RoutesAPI.Subjects}/${idClass}/attendances?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const saveSubjectAttendance = async ({ idClass, data }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/attendances`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const SubjectServices = {
    getAllSubjects,
    getSubject,
    getSubjectAttendance,
    saveSubjectAttendance
}

export default SubjectServices