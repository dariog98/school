import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SubjectServices } from '../services'
import { useNavigate } from 'react-router-dom'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { schemaClass } from '../constants/schemas'
import { yupResolver } from '@hookform/resolvers/yup'

const useClassForm = ({ idClass, data }) => {
    const { language } = useSettingsContext()
    const [isLoading, setLoading] = useState(false)
    const form = useForm({ defaultValues: data, resolver: yupResolver(schemaClass) })
    const navigate = useNavigate()
    const {
        addCreatedSuccessfullyNotification,
        addUpdatedSuccessfullyNotification,
        //addRemovedSuccessfullyNotification,
        addWarningNotification
    } = useNotificationsContext()

    const ResponseHandler = {
        201: () => {
            addCreatedSuccessfullyNotification(language.messages.ClassCreated)
            setTimeout(() => navigate(-1), 1000)
        },
        200: () => {
            addUpdatedSuccessfullyNotification(language.messages.ClassUpdated)
            setTimeout(() => navigate(-1), 1000)
        }
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            // Create
            if (!idClass) {
                const response = await SubjectServices.createSubject({ data })
                ResponseHandler[response.status]()
            // Update
            } else {
                const response = await SubjectServices.updateSubject({ idClass, data })
                ResponseHandler[response.status]()
            }
        } catch (error) {
            console.log(error)
            addWarningNotification(language.messages.ConnectionError)
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