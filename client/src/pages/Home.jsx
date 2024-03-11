import { Button, SkoolLogo } from '../components/basics'
import { Link } from 'react-router-dom'
import { Routes } from '../constants/routes'
import { useUserContext } from '../components/providers/UserProvider'
import LoggedUser from '../components/basics/LoggedUser'
import background from '../../public/md-duran-1VqHRwxcCCw-unsplash.jpg'

const HomeNavbar = ({ children }) => {
    return (
        <nav className='card border-0 rounded-0 text-light' style={{ background: 'transparent', height: '4rem' }}>
            <div className='container my-auto'>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                    {children}
                </div>
            </div>
        </nav>
    )
}

const GetStarted = () => {
    return (
        <div className='d-flex gap-3 align-items-center'>
            <div>
                <span className='pe-1'>{'Have you an account?'.toLocaleUpperCase()}</span>
                <Link to={Routes.Login} className='underline'>{'Log In'.toLocaleUpperCase()}</Link>
            </div>
            <Button
                className='btn-light'
                text='GET STARTED'
            />
        </div>
    )
}

const Home = () => {
    const { user } = useUserContext()

    return (
        <>
            <header className='d-flex justify-content-center home-header'>
                <img src={background} className='home-img'/>

                <div className='position-absolute' style={{ top: 0, left: 0, right: 0 }}>
                    <HomeNavbar>
                        <SkoolLogo/>
                        {user ? <LoggedUser/> : <GetStarted/>}
                    </HomeNavbar>
                </div>
            </header>
            
            <main>
                Aplication for School management
            </main>

            <footer>

            </footer>
        </>
    )
}

export default Home