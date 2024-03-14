import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettingsContext } from '../providers/SettingsProvider'

const NotFound = () => {
    const { language } = useSettingsContext()
    return (
        <div>
            <div className='d-flex flex-column align-items-center gap-3'>
                <FontAwesomeIcon icon={faExclamationTriangle} size='10x'/>
                <span className='text-uppercase fw-bold fs-5'>404 - Not found</span>
                <span className='text-secondary'>{language.messages.PageNotFound}</span>
            </div>
        </div>
    )
}

export default NotFound