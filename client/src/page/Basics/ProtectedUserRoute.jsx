import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from './UserProvider'
import { ROUTES } from '../../constants/Routes'

const ProtectedUserRoute = () => {
    const { user } = useUserContext()

    if (!user) {
        return <Navigate to={ROUTES.Login} replace/>
    }

    return <Outlet/>
}

export default ProtectedUserRoute
  