import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegisterStudent } from '../constants/schemas'
import { useUserContext } from '../components/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { UserServices } from '../services'
import { Routes } from '../constants/routes'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const useRegister = () => {
    const navigate = useNavigate()
    const { language } = useSettingsContext()
    const { handleLogIn } = useUserContext()
    const { addNotification, addWarningNotification } = useNotificationsContext()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({ resolver: yupResolver(schemaRegisterStudent) })

    const ResponseHandler = {
        201: (response) => {
            addNotification({ icon: faUser, message: language.messages.RegisterSuccess })
            setTimeout(() => {
                handleLogIn(response.data)
                navigate(Routes.Login)
            }, 1000)
        }
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await UserServices.registerStudent(data)
            ResponseHandler[response.status](response)
        } catch (error) {
            addWarningNotification(language.messages.ConnectionError)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useRegister