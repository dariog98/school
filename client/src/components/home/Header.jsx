import { Link } from 'react-router-dom'
import { ButtonLink, LoggedUser, SkoolLogo } from '../basics'
import { Routes } from '../../constants/routes'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useUserContext } from '../providers/UserProvider'
import background from '../../assets/md-duran-1VqHRwxcCCw-unsplash.jpg'

const HomeNavbar = ({ children }) => {
    return (
        <nav className='d-flex align-items-center text-light py-2' style={{ background: 'transparent', minHeight: '4rem' }}>
            <div className='container'>
                <div className='d-flex flex-wrap justify-content-between align-items-center gap-3'>
                    {children}
                </div>
            </div>
        </nav>
    )
}

const GetStarted = () => {
    const { language } = useSettingsContext()
    return (
        <div className='d-flex gap-3 align-items-center'>
            <div>
                <span className='pe-1'>{'Have you an account?'.toLocaleUpperCase()}</span>
                <Link to={Routes.Login} className='underline'>{language.messages.LogIn.toLocaleUpperCase()}</Link>
            </div>
            {/*
            <ButtonLink
                to={Routes.Register}
                className='btn-light rounded-5 fw-bold'
                text={language.messages.GetStarted}
            />
            */}
        </div>
    )
}

const Header = () => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()

    return (
        <header className='position-relative'>
            <div className='d-flex flex-wrap justify-content-center align-items-center home-header w-100'>
                <img src={background} className='home-img'/>

                <div className='p-4 d-flex flex-column gap-3 text-light align-items-end' style={{ maxWidth: '450px' }}>
                    <div className='fs-1 fw-bold'>
                        Manage your school management easily
                    </div>
                    {/*
                    <div>
                        <ButtonLink
                            to={Routes.Register}
                            className='btn-light rounded-5 fw-bold'
                            text={language.messages.GetStarted}
                        />
                    </div>
                    */}
                </div>
            </div>

            <div className='position-absolute' style={{ top: 0, left: 0, right: 0 }}>
                <HomeNavbar>
                    <SkoolLogo/>
                    {user ? <LoggedUser/> : <GetStarted/>}
                </HomeNavbar>
            </div>
        </header>
    )
}

export default Header