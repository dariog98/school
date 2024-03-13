import { Routes } from '../../constants/routes'
import ButtonLink from './ButtonLink'
import LoggedUser from './LoggedUser'
import Navbar from './Navbar'
import SkoolLogo from './SkoolLogo'

const Container = ({ title, children }) => {
    return (
        <div className='d-flex flex-column'>
            <Navbar>
                <SkoolLogo/>
                <div className='d-flex gap-3'>
                    <ButtonLink
                        to={Routes.Classes}
                        className='btn-outline-light rounded-5'
                        text='Classes'
                    />
                    <LoggedUser/>
                </div>
            </Navbar>
            <div className='container my-4'>
            {children}
            </div>
        </div>
    )
}

export default Container