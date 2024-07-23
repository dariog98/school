import * as yup from 'yup'
import { LANGUAGES } from './languages'

const currentLanguage = JSON.parse(window.localStorage.getItem('LANGUAGE')) || 'EN'
const language = LANGUAGES[currentLanguage]

const schemaLogin = yup.object({
    username: yup.string().required(language.messages.FieldRequired),
    password: yup.string().required(language.messages.FieldRequired)
})

const schemaRegisterStudent = yup.object({
    surnames: yup.string().required(language.messages.FieldRequired),
    names: yup.string().required(language.messages.FieldRequired),
    username: yup.string().required(language.messages.FieldRequired),
    password: yup.string().required(language.messages.FieldRequired),
    dni: yup.string().required(language.messages.FieldRequired),
    mail: yup.string().required(language.messages.FieldRequired),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], language.messages.FieldsDoNotMatch).required(language.messages.FieldRequired),
})

const schemaTest = yup.object({
    description: yup.string().required(language.messages.FieldRequired),
    date: yup.date().nullable().typeError(language.messages.InvalidDate).required(language.messages.FieldRequired),
})

const schemaClass = yup.object({
    description: yup.string().required(language.messages.FieldRequired),
})

const schemaUser = yup.object({
    surnames: yup.string().required(language.messages.FieldRequired),
    names: yup.string().required(language.messages.FieldRequired),
    dni: yup.string().required(language.messages.FieldRequired),
})

export {
    schemaLogin,
    schemaTest,
    schemaRegisterStudent,
    schemaClass,
    schemaUser
}