import useFetch from './useFetch'
import { SubjectServices } from '../services'

const useClassTests = ({ idClass, search }) => {
    const getClassTests = async () => {
        return await SubjectServices.getSubjectTests({ idClass, search })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClassTests, [idClass, search])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClassTests