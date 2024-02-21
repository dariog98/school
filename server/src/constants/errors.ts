class ExpressError extends Error {
    error: Error | undefined
    statusCode: number
    errorCode: number | undefined

    constructor(message: string, statusCode: number, errorCode?: number | undefined) {
        super(message)
        //this.error = error
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}

class ClientError extends ExpressError {
    constructor(message: string, statusCode: number = 400, errorCode?: number | undefined) {
        super(message, statusCode, errorCode ?? statusCode)
    }
}

class ServerError extends ExpressError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode, undefined)
    }
}

export {
    ExpressError, ClientError, ServerError
}