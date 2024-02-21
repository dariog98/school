import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../providers/UserProvider'
import { Routes } from '../../constants/routes'

const ProtectedUserRoute = () => {
    const { user } = useUserContext()

    if (!user) return <Navigate to={Routes.Login} replace/>

    return <Outlet/>
}

export default ProtectedUserRoute
  