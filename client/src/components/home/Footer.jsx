import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer className='home-footer text-light'>
            <div className='container'>
                <div className='d-flex justify-content-center align-items-center'>

                    <div className='text-end pe-2'>
                        <div>
                            <FontAwesomeIcon icon={faGithub} className='pe-1'/>
                            <a className='underline-on-hover' href='https://github.com/dariog98/school'>Source code</a>
                        </div>
                        <span>2024</span>
                    </div>

                    <div className='border-start ps-2 d-flex flex-column gap-1'>
                        <span>School demo application</span>
                        <span>Developer by <a className='underline-on-hover' href='https://github.com/dariog98'>Dario Gonzalez</a></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer