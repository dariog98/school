import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useClassrooms = () => {
    const [loading, setLoading] = useState(false)
    const [classrooms, setClassrooms] = useState([])
    const [searchDescription, setSearchDescription] = useState('')
    const { user } = useUserContext()

    const getAllClassrooms = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'Accept': 'application/json',
                }
            }

            const response = await fetch(`${APIROUTES.Classrooms}?description=${searchDescription}`, config)
            
            if (response.status === 200) {
                const result = await response.json()
                if (result.data) {
                    setClassrooms(result.data)
                }
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const createClassroom = async (data) => {
        try {
            setLoading(true)

            const model = {
                description: data?.description,
                classtime: { id: data?.classtime }
            }

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(model)
            }

            const response = await fetch(APIROUTES.Classrooms, config)
            if (response.status === 200) {
                getAllClassrooms()
            }
            setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllClassrooms()
    }, [searchDescription])

    return {
        loading,
        classrooms,
        handleDescription: setSearchDescription,
        createClassroom
    }
}

export default useClassrooms