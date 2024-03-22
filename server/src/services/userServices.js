import { ClientError, ServerError } from '../constants/errors.js'
import { compare, encrypt } from '../utils/handleBcrypt.js'
import { User } from '../models/index.js'
import { tokenSign } from '../utils/handleToken.js'
import { USER_ROLES } from '../constants/userRoles.js'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const createUserDataAndTokens = async (user) => {
    const { id: idUser, names, surnames, username, mail, phone, charge, role, dni, birthdate } = user
    const userResume = { idUser, username, role }

    const accessToken = await tokenSign(userResume, tokenSecretKey, '24h')
    const refreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

    const data = {
        idUser,
        surnames,
        names,
        username,
        dni,
        birthdate,
        mail,
        phone,
        charge,
        role,
        accessToken,
        refreshToken
    }

    return data
}

const loginUser = async (username, password) => {
    const user = await User.getByUsername(username)
    if (!user) throw new ClientError('User not found', 404)
    
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) throw new ClientError('Invalid password', 409)
    
    const data = await createUserDataAndTokens(user)
    return data
}

const createUser = async (surnames, names, username, password, dni, mail, birthdate, phone, address, idRole) => {
    try {
        const passwordHash = await encrypt(password)
        await User.create({ names, surnames, username, password: passwordHash, dni, mail, birthdate, phone, address, role_id: idRole })
    } catch(error) {
        //console.log(error)
        const errorCode = error.original.code
        if (Number(errorCode) === 23505) {
            if (error.fields.username) throw new ClientError('Username is duplicate', 409, 1001)
            if (error.fields.dni) throw new ClientError('DNI is duplicate', 409, 1002)
            if (error.fields.mail) throw new ClientError('Mail is duplicate', 409, 1003)
        }
        throw new ServerError('Server error')
    }
}

const updateUser = async (idUser, surnames, names, dni, birthdate, phone, address) => {
    const user = await User.findOne({ where: { id: idUser } })
    if (!user) throw new ClientError('User not found', 404)

    try {
        await user.update({ surnames, names, dni, birthdate, phone, address })
        const data = await createUserDataAndTokens(user)
        return data
    } catch(error) {
        console.log(error)
        throw new ServerError('Server error')
    }
}

const getUserById = async (idUser) => {
    const user = await User.findOne({
        attributes: { exclude: ['is_deleted']},
        where: { id: idUser },
        include: ['classrooms', 'role']
    })
    return user
}

const UserServices = {
    loginUser,
    createUser,
    updateUser,
    getUserById
}

export default UserServices