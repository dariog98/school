import { useParams } from 'react-router-dom'
import { ButtonLink, Container, Title } from '../components/basics'
import { useClass, useCustomSearchParams } from '../hooks'
import ClassStudents from '../components/class/ClassStudents'
import ClassData from '../components/class/ClassData'
import { Routes } from '../constants/routes'
import ClassTests from '../components/class/ClassTests'
import ClassAttendances from '../components/class/ClassAttendances'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const TABS = {
    Students: 'students',
    Tests: 'tests',
    Attendances: 'attendances',
}

const TAB_COMPONENTS = {
    students: ClassStudents,
    tests: ClassTests,
    attendances: ClassAttendances,
}

const Subject = () => {
    const { id: idClass } = useParams()
    const { language } = useSettingsContext()
    const tab = useCustomSearchParams('tab')
    const { data, refreshData } = useClass({ idClass })
    const CurrentTab = TAB_COMPONENTS[tab.getItem() ?? TABS.Students]
    
    return (
        <Container title={data?.data.description ?? 'Class'}>
            {
                data && data?.data &&
                <div className='d-flex flex-column gap-3'>
                    <Title text={data.data.description}>
                        <ButtonLink
                            to={Routes.Classes}
                            className='btn-outline-system rounded-5'
                            icon={faArrowLeft}
                            text={language.buttons.GoBack}
                        />
                    </Title>

                    <ClassData data={data.data} refreshData={refreshData}/>

                    <ul className='nav nav-tabs'>
                        <li className='nav-item' onClick={() => tab.setItem(TABS.Students)}>
                            <span className={`nav-link ${tab.getItem() === TABS.Students ? 'active' : ''}`}>Students</span>
                        </li>
                        <li className='nav-item' onClick={() => tab.setItem(TABS.Tests)}>
                            <span className={`nav-link ${tab.getItem() === TABS.Tests ? 'active' : ''}`}>Tests</span>
                        </li>
                        <li className='nav-item' onClick={() => tab.setItem(TABS.Attendances)}>
                            <span className={`nav-link ${tab.getItem() === TABS.Attendances ? 'active' : ''}`}>Attedances</span>
                        </li>
                    </ul>

                    <CurrentTab idClass={idClass}/>
                </div>
            }
        </Container>
    )
}

export default Subject