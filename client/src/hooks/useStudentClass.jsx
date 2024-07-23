import { useState } from 'react'
import { SubjectServices } from '../services'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useUserContext } from '../components/providers/UserProvider'

const useStudentClass = () => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()
    const [isLoading, setIsLoading] = useState()
    const {
        addCreatedSuccessfullyNotification,
        addRemovedSuccessfullyNotification,
        addWarningNotification
    } = useNotificationsContext()

    const JoinResponseHandler = {
        200: () => {
            addCreatedSuccessfullyNotification(language.messages.JoinClass)
            setTimeout(() => navigate(-1), 1000)
        }
    }

    const LeaveResponseHandler = {
        200: () => {
            addRemovedSuccessfullyNotification(language.messages.LeaveClass)
            setTimeout(() => navigate(-1), 1000)
        }
    }

    const handleJoin = async (idClass) => {
        try {
            setIsLoading(true)
            const response = await SubjectServices.joinClassroomAsStudent({ idClass, idUser: user.idUser })
            console.log(response)
            JoinResponseHandler[response.status]()
        } catch (error) {
            console.log(error)
            addWarningNotification(language.messages.ConnectionError)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLeave = async (idClass) => {
        try {
            setIsLoading(true)
            const response = await SubjectServices.leaveClassroomAsStudent({ idClass, idUser: user.id })
            LeaveResponseHandler[response.status]()
        } catch (error) {
            console.log(error)
            addWarningNotification(language.messages.ConnectionError)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        handleJoin,
        handleLeave
    }
}

export default useStudentClass