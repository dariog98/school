import { ErrorResponseBody, ResponseBody } from '../types'

const sendResponse = ({ response, statusCode, status, message, data, total, totalPages }: ResponseBody) => {
    response.status(statusCode).send({
        status: status ?? statusCode,
        message,
        totalPages,
        total,
        data,
    }).end()
}

const sendErrorResponse = ({ response, statusCode, errorCode, message } : ErrorResponseBody) => {
    response.status(statusCode ?? 500).json({
        status: errorCode ?? 500,
        message
    })
}

export { sendResponse, sendErrorResponse }