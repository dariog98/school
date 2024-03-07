class ExpressError extends Error {
    error
    statusCode
    errorCode

    constructor(message, statusCode, errorCode) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
    }

    setError(error) {
        this.error = error
    }
}

class ClientError extends ExpressError {
    constructor(message, statusCode, errorCode) {
        super(message, statusCode, errorCode ?? statusCode)
    }
}

class ServerError extends ExpressError {
    constructor(message, statusCode, errorCode) {
        super(message, statusCode, undefined)
    }
}

export {
    ExpressError, ClientError, ServerError
}