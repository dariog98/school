import * as dotenv from 'dotenv'
import mysql2 from 'mysql2'
import { Sequelize } from 'sequelize'

dotenv.config()
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const port = process.env.DB_PORT
const mode = process.env.MODE

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: hostname,
        dialect: 'mysql',
        dialectModule: mysql2,
        port: port
    }
)

const dbConnectSQL = async() => {
    try {
        await sequelize.authenticate()
        console.log('MySQL connection success')
    } catch (error) {
        console.log('MySQL connection error')
        console.log(error)
    }
}

export { sequelize, dbConnectSQL }