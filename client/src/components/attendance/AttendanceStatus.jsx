import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const AttendanceStatus = ({ status }) => {
    return (
        status === 'saved' ?
        <div className='alert alert-violet'>
            <div className='d-flex gap-3 align-items-center'>
                <FontAwesomeIcon icon={faFloppyDisk} style={{ width: '1.5rem', height: '1.5rem' }}/>
                Saved
            </div>
        </div>
        :
        <div className='alert alert-secondary'>
            <div className='d-flex gap-3 align-items-center'>
                <FontAwesomeIcon icon={faCircleExclamation} style={{ width: '1.5rem', height: '1.5rem' }}/>
                Not saved
            </div>
        </div>
    )
}

export default AttendanceStatus