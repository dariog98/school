import * as yup from 'yup'
import { LANGUAGES } from './languages'

const currentLanguage = JSON.parse(window.localStorage.getItem('LANGUAGE')) || 'EN'
const language = LANGUAGES[currentLanguage]

const schemaLogin = yup.object({
    username: yup.string().required(language.messages.FieldRequired),
    password: yup.string().required(language.messages.FieldRequired)
})

const schemaTest = yup.object({
    description: yup.string().required(language.messages.FieldRequired),
    date: yup.date().nullable().typeError(language.messages.InvalidDate).required(language.messages.FieldRequired),
})

export {
    schemaLogin,
    schemaTest,
}