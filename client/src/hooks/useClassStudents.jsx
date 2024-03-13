import useFetch from './useFetch'
import { SubjectServices } from '../services'

const useClassStudents = ({ idClass, search }) => {
    const getClassStudents = async () => {
        return await SubjectServices.getSubjectStudents({ idClass, search })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClassStudents, [idClass, search])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClassStudents