const sendResponse = ({ response, statusCode, status, message, content }) => {
    response.status(statusCode).send({
        status: status ?? statusCode,
        message,
        ...content
    }).end()
}

const sendErrorResponse = ({ response, statusCode, errorCode, message }) => {
    response.status(statusCode ?? 500).json({
        status: errorCode ?? 500,
        message
    })
}

export { sendResponse, sendErrorResponse }