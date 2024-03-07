import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { useUserContext } from '../providers/UserProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const Navbar = ({ children }) => {
    return (
        <nav className='card border-0 rounded-0 shadow-sm text-light' style={{ backgroundColor: '#473aa0', height: '4rem' }}>
            <div className='container my-auto'>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                    {children}
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