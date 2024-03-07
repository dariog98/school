import useFetch from './useFetch'
import { SubjectServices } from '../services'
import { getStringDateInTimeZone } from '../constants/date'

const useClassAttendance = ({ idClass, date }) => {
    const getClassAttedance = async () => {
        return await SubjectServices.getSubjectAttendance({ idClass, date: date ? getStringDateInTimeZone(date, 'UTC') : '' })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClassAttedance, [idClass, date])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClassAttendance