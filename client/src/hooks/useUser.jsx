import { UserServices } from '../services'
import useFetch from './useFetch'

const useUser = ({ idUser } = {}) => {
    const getUser = async () => {
        return await UserServices.getUser({ idUser })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getUser, [idUser])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default useUser