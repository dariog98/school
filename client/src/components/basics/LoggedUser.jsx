import { Link } from 'react-router-dom'
import { useUserContext } from '../providers/UserProvider'
import { Routes } from '../../constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const LoggedUser = () => {
    const { user } = useUserContext()

    return (
        <div className='d-flex align-items-center gap-2'>
            {
                user &&
                <Link to={`${Routes.Users}/${user.idUser}`} className='d-flex align-items-center gap-1 underline-on-hover'>
                    <div className='border border-light rounded-5 d-flex justify-content-center align-items-center' style={{ width: '2rem', height: '2rem' }}>
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <div>{`${user.surnames ?? ''} ${user.names ?? ''}`}</div>
                </Link>
            }
        </div>
    )
}

export default LoggedUser