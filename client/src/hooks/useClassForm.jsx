import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SubjectServices } from '../services'
import { useNavigate } from 'react-router-dom'

const useClassForm = ({ idClass, data }) => {
    const [isLoading, setLoading] = useState(false)
    const form = useForm({ defaultValues: data })
    const navigate = useNavigate()

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            // Create
            if (!idClass) {
                const response = await SubjectServices.createSubject({ data })
                if (response.status === 201) {
                    setTimeout(() => navigate(-1), 1000)
                }
            // Update
            } else {
                console.log({ data })
                const response = await SubjectServices.updateSubject({ idClass, data })
                if (response.status === 200) {
                    setTimeout(() => navigate(-1), 1000)
                }
            }
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

export default useClassForm