import { RoutesAPI } from '../constants/api'
import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'

const getAllSubjects = async ({ search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        //page: page ?? 1,
        //order: JSON.stringify(order ?? []),
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

const createSubject = async ({ data }) => {
    const url = RoutesAPI.Subjects
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateSubject = async ({ idClass, data }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubjectStudents = async ({ idClass, search }) => {
    const params = new URLSearchParams({
        search: search ?? '',
    })
    
    const url = `${RoutesAPI.Subjects}/${idClass}/students?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubjectAttendance = async ({ idClass, date, search }) => {
    const params = new URLSearchParams({
        search: search ?? '',
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

const joinClassroomAsStudent = async ({idClass, idUser }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/students/${idUser}`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON , userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const leaveClassroomAsStudent = async ({idClass, idUser }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/students/${idUser}`
    const request = newRequest({ url, method: METHODS.Delete, contentType: CONTENT_TYPES.JSON , userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const joinClassroomAsProfessor = async ({idClass, idUser }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/professors/${idUser}`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON , userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const leaveClassroomAsProfessor = async ({idClass, idUser }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/professors/${idUser}`
    const request = newRequest({ url, method: METHODS.Delete, contentType: CONTENT_TYPES.JSON , userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubjectTests = async ({ idClass, search }) => {
    const params = new URLSearchParams({
        search: search ?? '',
    })

    const url = `${RoutesAPI.Subjects}/${idClass}/tests?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getSubjectTest = async ({ idClass, idTest }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/tests/${idTest}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createSubjectTest = async ({ idClass, data }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/tests`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateSubjectTest = async ({ idClass, idTest, data }) => {
    const url = `${RoutesAPI.Subjects}/${idClass}/tests/${idTest}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const SubjectServices = {
    getAllSubjects,
    getSubject,
    createSubject,
    updateSubject,
    getSubjectStudents,
    getSubjectAttendance,
    saveSubjectAttendance,
    joinClassroomAsProfessor,
    leaveClassroomAsProfessor,
    joinClassroomAsStudent,
    leaveClassroomAsStudent,
    getSubjectTests,
    getSubjectTest,
    createSubjectTest,
    updateSubjectTest,
}

export default SubjectServices