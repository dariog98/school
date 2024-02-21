import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { useUserContext } from '../providers/UserProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const Navbar = ({ title }) => {
    const { user } = useUserContext()
    const { isThemeDark, toggleTheme } = useSettingsContext()

    return (
        <nav className='card border-0 rounded-0 shadow-sm' style={{ height: '4rem' }}>
            <div className='container my-auto'>
                <div className='d-flex justify-content-between align-items-center px-3'>
                    <div className='fs-4'>{title}</div>

                    <div className='d-flex align-items-center gap-2'>
                        <button
                            className='btn btn-minimal rounded-5 d-flex justify-content-center align-items-center'
                            style={{ width: '2.5rem', height: '2.5rem' }}
                            onClick={toggleTheme}
                        >
                            <FontAwesomeIcon icon={isThemeDark ? faMoon : faSun} style={{ width: '1.5rem', height: '1.5rem' }}/>
                        </button>
                        {
                            user &&
                            <Link to={`${Routes.Users}/${user.idUser}`}  className='text-end'>
                                <div>{`${user.surnames} ${user.names}`}</div>
                                <small>{user.username}</small>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )

    return (
        <nav className='card border-0 rounded-0 shadow-sm d-flex flex-row justify-content-between align-items-center px-5' style={{ height: '4rem' }}>
            <div className='fs-4'>
                App
            </div>
            
            <div className='d-flex align-items-center gap-2'>
                <button
                    className='btn rounded-5 d-flex justify-content-center align-items-center'
                    style={{ width: '3rem', height: '3rem' }}
                >
                    <FontAwesomeIcon icon={faSun} style={{ width: '1.75rem', height: '1.75rem' }}/>
                </button>
            {
                user &&
                <div>
                    {user.username}
                </div>
            }
            </div>
        </nav>
    )
}

export default Navbar