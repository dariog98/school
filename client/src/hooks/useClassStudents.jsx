import useFetch from './useFetch'
import { SubjectServices } from '../services'

const useClassStudents = ({ idClass }) => {
    const getClassStudents = async () => {
        return await SubjectServices.getSubjectStudents({ idClass })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClassStudents, [idClass])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClassStudents