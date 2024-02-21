import { useEffect, useState } from 'react'
import { APIROUTES } from '../../../constants/ApiRoutes'
import { useUserContext } from '../../Basics/UserProvider'

const useProfessors = () => {
    const [loading, setLoading] = useState(false)
    const [professors, setProfessors] = useState([])
    const [searchName, setSearchName] = useState('')
    const { user } = useUserContext()

    const getAllProfessors = async () => {
        try {
            setLoading(true)

            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const response = await fetch(`${APIROUTES.Professors}?name=${searchName}`, config)
            if (response.status === 200) {
                const result = await response.json()
                setProfessors(result.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const createProfessor = async (data) => {
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

            const response = await fetch(APIROUTES.Professors, config)
            if (response.status === 200) {
                getAllProfessors()
            }
            setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllProfessors()
    }, [searchName])

    return {
        loading,
        professors,
        handleName: setSearchName,
        createProfessor
    }
}

export default useProfessors