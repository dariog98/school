import { useForm } from 'react-hook-form'
import { useUserContext } from '../components/providers/UserProvider'
import { UserServices } from '../services'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useUserForm = () => {
    const [isLoading, setLoading] = useState(false)
    const { user, handleLogIn } = useUserContext()
    const form = useForm({ defaultValues: user })
    const navigate = useNavigate()

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            const response = await UserServices.updateUser(data)
            if (response.status === 200) {
                handleLogIn(response.data)
                setTimeout(() => navigate(-1), 1000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useUserForm