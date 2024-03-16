import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { SubjectServices } from '../services'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaTest } from '../constants/schemas'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const useTestForm = ({ idClass, idTest, data }) => {
    const { language } = useSettingsContext()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({ defaultValues: data, resolver: yupResolver(schemaTest) })
    const navigate = useNavigate()
    const {
        addCreatedSuccessfullyNotification,
        addUpdatedSuccessfullyNotification,
        //addRemovedSuccessfullyNotification,
        addWarningNotification
    } = useNotificationsContext()

    const ResponseHandler = {
        201: () => {
            addCreatedSuccessfullyNotification(language.messages.TestCreated)
            setTimeout(() => navigate(-1), 1000)
        },
        200: () => {
            addUpdatedSuccessfullyNotification(language.messages.TestUpdated)
            setTimeout(() => navigate(-1), 1000)
        }
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const { description, date, students: records } = data
            const students = Object.keys(records).map(idStudent => ({ id: idStudent, qualification: records[idStudent] }))

            if (Number(idTest)) {
                const response = await SubjectServices.updateSubjectTest({ idClass, idTest, data: { description, date, students } })
                ResponseHandler[response.status]()
            } else {
                const response = await SubjectServices.createSubjectTest({ idClass, data: { description, date, students } })
                ResponseHandler[response.status]()    
            }
        } catch (error) {
            console.log(error)
            addWarningNotification(language.messages.ConnectionError)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading,
    }
}

export default useTestForm