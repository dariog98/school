const sendResponse = ({ response, statusCode, status, message, data, total, totalPages }) => {
    response.status(statusCode).send({
        status: status ?? statusCode,
        message,
        totalPages,
        total,
        data,
    }).end()
}

const sendErrorResponse = ({ response, statusCode, errorCode, message }) => {
    response.status(statusCode ?? 500).json({
        status: errorCode ?? 500,
        message
    })
}

export { sendResponse, sendErrorResponse }