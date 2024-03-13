import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faChalkboardUser, faFile, faFileLines, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/home/Footer'
import Header from '../components/home/Header'

const Item = ({ icon, description }) => {
    return (
        <div className='card rounded-4 bg-body-tertiary'>
            <div className='card-body p-2 d-flex align-items-center flex-row gap-3'>
                <div className='d-flex justify-content-center align-items-center rounded-3 home-feature-icon'>
                    <FontAwesomeIcon icon={icon} style={{ width: '2.5rem', height: '2.5rem' }}/>
                </div>
                <div>
                    <span className='fs-4 font-fredoka'>{description}</span>
                </div>
            </div>
        </div>
    )
}
const Home = () => {
    return (
        <>
            <Header/>

            <main className='d-flex justify-content-center align-items-center' style={{ height: '700px' }}>
                <div className='container d-flex flex-column justify-content-center align-items-center gap-5'>
                    <span className='fw-bold fs-3 font-fredoka'>Features</span>

                    <div className='home-feature-items mb-4'>
                        <Item icon={faChalkboardUser} description='Class management'/>
                        <Item icon={faFileLines} description='Test management'/>
                        <Item icon={faGraduationCap} description='Students management'/>
                        <Item icon={faCalendarDays} description='Attendance control'/>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Home