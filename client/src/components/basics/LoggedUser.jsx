import { Link } from 'react-router-dom'
import { useUserContext } from '../providers/UserProvider'
import { Routes } from '../../constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import ButtonLink from './ButtonLink'
/*
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
*/

const LoggedUser = () => {
    const { user } = useUserContext()

    return (
        <div className='d-flex align-items-center gap-2'>
            {
                user &&
                <ButtonLink
                    to={`${Routes.Users}/${user.idUser}`}
                    className='btn-light rounded-5'
                    icon={faCircleUser}
                    text={`${user.surnames ?? ''} ${user.names ?? ''}`}
                />
            }
        </div>
    )
}

export default LoggedUser