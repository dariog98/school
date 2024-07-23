import { useForm } from 'react-hook-form'
import { getStringDateInTimeZone } from '../constants/date'
import { SubjectServices } from '../services'
import { useState } from 'react'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const useClassAttendanceForm = ({ idClass, date, data }) => {
    const { language } = useSettingsContext()
    const { addNotification, addWarningNotification } = useNotificationsContext()
    const [isLoading, setLoading] = useState(false)
    const form = useForm({
        defaultValues: data.reduce((accumulator, current) => {
            const student = current
            accumulator[student.id] = student.status ? String(student.status) : "1"
            return accumulator
        },{})
    })

    const ResponseHandler = {
        200: () => {
            addNotification({ message: language.messages.ClassAttendancesSaved, icon: faFloppyDisk })
            setTimeout(() => navigate(-1), 1000)
        },
        500: () => {
            addWarningNotification(language.messages.AnErrorOcurred)
        }
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            const attendances = { date: getStringDateInTimeZone(date, 'UTC'), attendances: Object.keys(data).map(idStudent => ({ idStudent, status: data[idStudent] })) }
            const response = await SubjectServices.saveSubjectAttendance({ idClass, data: attendances })
            ResponseHandler[response.status]()
        } catch (error) {
            console.log(error)
            addWarningNotification(language.messages.ConnectionError)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        date,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading
    }
}

export default useClassAttendanceForm