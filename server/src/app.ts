import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import { sendErrorResponse } from './utils/handleResponse'
import { ExpressError } from './constants/errors'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(router)

app.use((error: ExpressError, _request: Request, response: Response, _next: NextFunction): void => {
    console.log(error)
    const { statusCode, errorCode, message } = error
    sendErrorResponse({ response, statusCode, errorCode, message })
})

export default app