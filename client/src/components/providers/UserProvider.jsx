import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../../hooks'

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState()
    const userStorage = useLocalStorage('USER')
    const userToken = user?.accessToken

    const handleLogIn = (user) => {
        setUser(user)
        userStorage.setItem(user)
    }

    const handleLogOut = () => {
        setUser(undefined)
        userStorage.removeItem()
    }

    const storagedUser = userStorage.getItem()

    if (!user && storagedUser) {
        try {
            setUser(storagedUser)
        } catch (error) {
            //Do nothing
        }
    }

    const UserController = { user, handleLogIn, handleLogOut }
    
    return (
        <userContext.Provider value={UserController}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext }