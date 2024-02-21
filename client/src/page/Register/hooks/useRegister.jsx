import { useUserContext } from '../../Basics/UserProvider'
import { useForm } from 'react-hook-form'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/Routes'

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const { handleLogIn } = useUserContext()
    const { register, formState: { errors }, getValues, handleSubmit } = useForm()
    const navigate = useNavigate()

    const registerUser = async (data) => {
        try {
            setLoading(true)

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(APIROUTES.Register, config)
            if (response.status === 200) {
                const result = await response.json()
                handleLogIn(result.data)
                navigate(ROUTES.Classrooms)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return {
        loading,
        formManager: { register, errors, getValues },
        handleSubmit: handleSubmit(registerUser)
    }
}

export default useRegister