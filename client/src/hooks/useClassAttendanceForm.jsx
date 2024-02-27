import { useForm } from 'react-hook-form'
import { getStringDateInTimeZone } from '../constants/date'
import { SubjectServices } from '../services'
import { useState } from 'react'

const useClassAttendanceForm = ({ idClass, date, data }) => {
    const [isLoading, setLoading] = useState(false)
    const form = useForm({
        defaultValues: data.reduce((accumulator, current) => {
            const student = current
            accumulator[student.id] = student?.attendance?.status ? String(student.attendance.status) : "1"
            return accumulator
        },{})
    })
    const status = data.length && data[0].attendance !== null ? true : false

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            const attendances = { date: getStringDateInTimeZone(date, 'UTC'), attendances: Object.keys(data).map(idStudent => ({ idStudent, status: data[idStudent] })) }
            console.log({ idClass, data: attendances })
            const response = await SubjectServices.saveSubjectAttendance({ idClass, data: attendances })
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        date,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading,
        status
    }
}

export default useClassAttendanceForm