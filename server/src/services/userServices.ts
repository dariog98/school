import { ClientError, ServerError } from '../constants/errors'
import { compare } from '../utils/handleBcrypt'
import { User } from '../models/index'
import { tokenSign } from '../utils/handleToken'

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

const loginUser = async (username: string, password: string) => {
    const user = await User.getByUsername(username)
    if (!user) throw new ClientError('User not found', 404)
    
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) throw new ClientError('Invalid password', 409)
    
    const data = await createUserDataAndTokens(user)
    return data
}

const registerUser = async (data) => {
    const { names, surnames, username, mail, dni, birthdate, phone, address, idRole: role_id } = data

    try {
        await User.create({ names, surnames, username, mail, dni, birthdate, phone, address, role_id })
    } catch(error) {
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

const getUserById = async (idUser: number) => {
    const user = await User.findOne({
        attributes: { exclude: ['is_deleted']},
        where: { id: idUser },
        include: ['classrooms', 'role']
    })
    return user
}

const UserServices = {
    loginUser,
    registerUser,
    updateUser,
    getUserById
}

export default UserServices