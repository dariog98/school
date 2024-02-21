import bcrypt from 'bcryptjs'

const encrypt = async (text: string) => {
    const hash = await bcrypt.hash(text, 10)
    return hash
}

const compare = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword)
}

export { encrypt, compare }