import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SkoolLogo = () => {
    return (
        <div className='d-flex gap-2 align-items-center'>
            <FontAwesomeIcon icon={faGraduationCap} size='2x'/>
            <h2 className='font-fredoka fw-bold p-0 m-0'>Skool</h2>
        </div>
    )
}

export default SkoolLogo