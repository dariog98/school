import useFetch from './useFetch'
import { SubjectServices } from '../services'
import { getStringDateInTimeZone } from '../constants/date'

const useClassAttendance = ({ idClass, date, search }) => {
    const getClassAttedance = async () => {
        return await SubjectServices.getSubjectAttendance({ idClass, date: date ? getStringDateInTimeZone(date, 'UTC') : '', search })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClassAttedance, [idClass, date, search])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClassAttendance