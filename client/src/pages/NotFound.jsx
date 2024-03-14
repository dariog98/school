import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MainContainer } from '../components/basics'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const NotFound = () => {
    const { language } = useSettingsContext()

    return (
        <MainContainer>
            <div className='max-content d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column align-items-center gap-3'>
                    <FontAwesomeIcon icon={faExclamationTriangle} size='10x'/>
                    <span className='text-uppercase fw-bold fs-5'>404 - Not found</span>
                    <span className='text-secondary'>{language.messages.PageNotFound}</span>
                </div>
            </div>
        </MainContainer>
    )
}

export default NotFound