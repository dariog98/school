import { useForm } from 'react-hook-form'
import { useUserContext } from '../components/providers/UserProvider'
import { UserServices } from '../services'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'

const useUserForm = () => {
    const { language } = useSettingsContext()
    const [isLoading, setIsLoading] = useState(false)
    const { user, handleLogIn } = useUserContext()
    const form = useForm({ defaultValues: user })
    const navigate = useNavigate()
    const {
        addUpdatedSuccessfullyNotification,
        addWarningNotification
    } = useNotificationsContext()

    const ResponseHandler = {
        200: (response) => {
            addUpdatedSuccessfullyNotification(language.messages.UserUpdated)
            handleLogIn(response.data)
            setTimeout(() => navigate(-1), 1000)
        }
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await UserServices.updateUser(data)
            ResponseHandler[response.status](response)
        } catch (error) {
            console.log(error)
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

export default useUserForm