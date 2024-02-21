import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useStudents = () => {
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchClass, setSearchClass] = useState()
    const { user } = useUserContext()

    const getAllStudents = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Students}?name=${searchName}&idClass=${searchClass ?? ''}`, config)
            if (response.status === 200) {
                const result = await response.json()
                setStudents(result.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const createStudent = async (data) => {
        try {
            setLoading(true)

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(APIROUTES.Students, config)
            console.log(response)
            if (response.status === 200) {
                getAllStudents()
            }
            setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllStudents()
    }, [searchName, searchClass])

    return {
        loading,
        students,
        handleName: setSearchName,
        handleClass: setSearchClass,
        createStudent
    }
}

export default useStudents