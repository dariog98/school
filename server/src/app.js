import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index.js'
import { sendErrorResponse } from './utils/handleResponse.js'
import { ExpressError } from './constants/errors.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(router)

app.use((error, _request, response, _next) => {
    console.log(error)
    const { statusCode, errorCode, message } = error
    sendErrorResponse({ response, statusCode, errorCode, message })
})

export default app