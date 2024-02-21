import { SubjectServices } from '../services'
import useFetch from './useFetch'

const useClass = ({ idClass } = {}) => {
    const getClass = async () => {
        return await SubjectServices.getSubject({ idClass })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getClass, [idClass])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useClass