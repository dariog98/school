import express from 'express'
import supertest from 'supertest'

const testServer = (route) => {
    const app = express()
    route(app)
    return supertest(app)
}

export default testServer