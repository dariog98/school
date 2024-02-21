import { ClientError, ServerError } from '../constants/errors'
import { compare } from '../utils/handleBcrypt'
import { User } from '../models/index'
import { tokenSign } from '../utils/handleToken'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const loginUser = async (username: string, password: string) => {
    const user = await User.getByUsername(username)
    if (!user) throw new ClientError('User not found', 404)
    
    const { id: idUser, names, surnames, mail, phone, charge, role } = user
    const userResume = { idUser, username, charge, role }
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) throw new ClientError('Invalid password', 409)
    
    const accessToken = await tokenSign(userResume, tokenSecretKey, '24h')
    const refreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

    const data = {
        idUser,
        surnames,
        names,
        username,
        mail,
        phone,
        charge,
        role,
        accessToken,
        refreshToken
    }

    return data
}

const registerUser = async(data) => {
    const { names, surnames, username, mail, dni, birthdate, phone, address, idRole: role_id } = data

    try {
        await User.create({ names, surnames, username, mail, dni, birthdate, phone, address, role_id })
    } catch(error) {
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
    getUserById
}

export default UserServices