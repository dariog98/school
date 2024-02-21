import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useProfessor = (idProfessor) => {
    const [loading, setLoading] = useState(false)
    const [professor, setProfessor] = useState()
    const { user } = useUserContext()

    const getProfessor = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Professors}/${idProfessor}`, config)
            const result = await response.json()
            setProfessor(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const editProfessor = async (data) => {
        try {
            //setLoading(true)
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(`${APIROUTES.Professors}/${idProfessor}`, config)
            if (response.status === 200) {
                const result = await response.json()
                setProfessor(result.data)    
            }
            //setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteProfessor = async () => {
        try {
            //setLoading(true)
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Professors}/${idProfessor}`, config)
            //setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const addClassroom = async (idClassroom) => {
        try {
            //setLoading(true)
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Professors}/${idProfessor}/classrooms/${idClassroom}`, config)
            if (response.status === 200) {
                //const result = await response.json()
                getProfessor()
            }
            //setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const removeClassroom = async (idClassroom) => {
        try {
            //setLoading(true)
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Professors}/${idProfessor}/classrooms/${idClassroom}`, config)
            const result = await response.json()
            if (response.status === 200) {
                //const result = await response.json()
                getProfessor()
            }
            //setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfessor()
    }, [idProfessor])

    return {
        loading,
        professor,
        editProfessor,
        deleteProfessor,
        addClassroom,
        removeClassroom
    }
}

export default useProfessor