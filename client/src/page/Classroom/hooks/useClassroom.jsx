import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useClassroom = (idClassroom) => {
    const [loading, setLoading] = useState(false)
    const [classroom, setClassroom] = useState()
    const { user } = useUserContext()

    const getClassroom = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Classrooms}/${idClassroom}`, config)
            const result = await response.json()
            setClassroom(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const editClassroom = async (data) => {
        try {
            //setLoading(true)

            const model = {
                description: data?.description,
                classtime: { id: data?.classtime }
            }

            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(model)
            }

            const response = await fetch(`${APIROUTES.Classrooms}/${idClassroom}`, config)
            if (response.status === 200) {
                const result = await response.json()
                setClassroom(result.data)
            }
            //setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteClassroom = async () => {
        try {
            //setLoading(true)
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Classrooms}/${idClassroom}`, config)
            //setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getClassroom()
    }, [idClassroom])

    return {
        loading,
        classroom,
        editClassroom,
        deleteClassroom
    }
}

export default useClassroom