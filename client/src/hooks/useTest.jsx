import { SubjectServices } from '../services'
import useFetch from './useFetch'

const useTest = ({ idClass, idTest }) => {
    const getTest = async () => {
        return await SubjectServices.getSubjectTest({ idClass, idTest })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getTest, [idClass, idTest])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useTest