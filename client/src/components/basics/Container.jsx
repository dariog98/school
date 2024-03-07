import LoggedUser from './LoggedUser'
import Navbar from './Navbar'
import SkoolLogo from './SkoolLogo'

const Container = ({ title, children }) => {
    return (
        <div className='d-flex flex-column gap-4'>
            <Navbar>
                <SkoolLogo/>
                <LoggedUser/>
            </Navbar>
            <div className='container'>
            {children}
            </div>
        </div>
    )
}

export default Container