import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLogin } from '../constants/schemas'
import { useUserContext } from '../components/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { UserServices } from '../services'
import { Routes } from '../constants/routes'

const useLogin = () => {
    const navigate = useNavigate()
    const { handleLogIn } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({ resolver: yupResolver(schemaLogin) })

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await UserServices.loginUser(data)
            if (response.status === 200) {
                handleLogIn(response.data)
                navigate(Routes.Classes)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useLogin