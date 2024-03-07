import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SubjectServices } from '../services'
import { useNavigate } from 'react-router-dom'

const useTestForm = ({ idClass, idTest, data }) => {
    const [isLoading, setLoading] = useState(false)
    const form = useForm({ defaultValues: data })
    const navigate = useNavigate()

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading,
    }
}

export default useTestForm