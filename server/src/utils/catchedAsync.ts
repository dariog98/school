import { Request, Response, NextFunction } from 'express'

const catchedAsync = (fn: Function) => {
    return (request: Request, response: Response, next: NextFunction) => {
        fn(request, response).catch((error: Error) => next(error))
    }
}

export { catchedAsync }