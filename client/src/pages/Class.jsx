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

const Subject = () => {
    const { id: idClass } = useParams()
    const { language } = useSettingsContext()
    const tab = useCustomSearchParams('tab')
    const currentTab = tab.getItem() ?? TABS.Students
    const { data, refreshData } = useClass({ idClass })
    
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
                            <span className={`nav-link ${currentTab === TABS.Students ? 'active' : ''}`}>Students</span>
                        </li>
                        <li className='nav-item' onClick={() => tab.setItem(TABS.Tests)}>
                            <span className={`nav-link ${currentTab === TABS.Tests ? 'active' : ''}`}>Tests</span>
                        </li>
                        <li className='nav-item' onClick={() => tab.setItem(TABS.Attendances)}>
                            <span className={`nav-link ${currentTab === TABS.Attendances ? 'active' : ''}`}>Attedances</span>
                        </li>
                    </ul>

                    <div>
                        {currentTab === TABS.Students && <ClassStudents idClass={idClass} students={data.data.students} refreshData={refreshData}/>}
                        {currentTab === TABS.Tests && <ClassTests idClass={idClass} tests={data.data.tests}/>}
                        {currentTab === TABS.Attendances && <ClassAttendances idClass={idClass}/>}
                    </div>
                </div>
            }
        </Container>
    )
}

export default Subject