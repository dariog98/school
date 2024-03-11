import { faPlus, faPen, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { createContext, useContext, useState } from 'react'
import { TOAST_TIME } from '../../constants/notifications'
import { Notification } from '../basics'

const notificationsContext = createContext()

const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const deleteNotification = (idNotification) => {
        setNotifications(n => n.filter(notif => notif.id !== idNotification))
    }

    const addNotification = ({ message, type, icon, time }) => {
        const notification = {
            id: Date.now(),
            message,
            icon,
            type: type ?? 'primary',
            time: time ?? TOAST_TIME.Short
        }
        setNotifications(n => [...n, notification])
        if (notification.time) setTimeout(() => deleteNotification(notification.id), notification.time)
    }

    const addCreatedSuccessfullyNotification = (message) => {
        const icon = faPlus
        const type = 'primary'
        const time = TOAST_TIME.Short
        addNotification({ icon, type, time, message })
    }

    const addUpdatedSuccessfullyNotification = (message) => {
        const icon = faPen
        const type = 'success'
        const time = TOAST_TIME.Short
        addNotification({ icon, type, time, message })
    }

    const addRemovedSuccessfullyNotification = (message) => {
        const icon = faTrashCan
        const type = 'danger'
        const time = TOAST_TIME.Short
        addNotification({ icon, type, time, message })
    }

    const addWarningNotification = (message) => {
        const icon = faTriangleExclamation
        const type = 'warning'
        const time = TOAST_TIME.Short
        addNotification({ icon, type, time, message })
    }

    const notificationsController = {
        notifications,
        addNotification,
        addCreatedSuccessfullyNotification,
        addUpdatedSuccessfullyNotification,
        addRemovedSuccessfullyNotification,
        addWarningNotification,
    }

    return (
        <notificationsContext.Provider value={notificationsController}>
            {children}
            <div className='toast-container position-fixed bottom-0 end-0 p-3'>
                {
                    notifications.map((notification) =>
                        <Notification
                            key={notification.id}
                            data={notification}
                            handleClose={() => deleteNotification(notification.id)}
                        />
                    )
                }
            </div>
        </notificationsContext.Provider>
    )
}

const useNotificationsContext = () => {
    return useContext(notificationsContext)
}

export { NotificationsProvider, useNotificationsContext }