import { Routes } from '../../constants/routes'
import { useSettingsContext } from '../providers/SettingsProvider'
import ButtonLink from './ButtonLink'
import LoggedUser from './LoggedUser'
import Navbar from './Navbar'
import SkoolLogo from './SkoolLogo'

const MainContainer = ({ children }) => {
    const { language } = useSettingsContext()
    return (
        <div className='d-flex flex-column'>
            <Navbar>
                <SkoolLogo/>
                <div className='d-flex gap-3'>
                    <ButtonLink
                        to={Routes.Classes}
                        className='btn-light rounded-5'
                        text={language.titles.Classes}
                    />
                    <LoggedUser/>
                </div>
            </Navbar>
            {children}
        </div>
    )
}

export default MainContainer