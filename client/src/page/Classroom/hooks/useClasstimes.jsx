import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useClasstimes = () => {
    const [loading, setLoading] = useState(false)
    const [classtimes, setClasstimes] = useState([])
    const { user } = useUserContext()

    const getClasstime = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(APIROUTES.Classtimes, config)
            const result = await response.json()
            setClasstimes(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getClasstime()
    }, [])

    return {
        loading,
        classtimes
    }
}

export default useClasstimes