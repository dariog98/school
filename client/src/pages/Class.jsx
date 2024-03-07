import { useParams, useSearchParams } from 'react-router-dom'
import { ButtonLink, Container } from '../components/basics'
import { useClass } from '../hooks'
import ClassStudents from '../components/class/ClassStudents'
import ClassData from '../components/class/ClassData'
import { Routes } from '../constants/routes'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import ClassTests from '../components/class/ClassTests'
import ClassAttendances from '../components/class/ClassAttendances'

const TABS = {
    Students: 'students',
    Tests: 'tests',
    Attendances: 'attendances',
}

const Subject = () => {
    const { id: idClass } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentTab = searchParams.get('tab') ?? TABS.Students
    const { data, refreshData } = useClass({ idClass })

    const handleTab = (value) => {
        setSearchParams(params => {
            params.set('tab', value)
            return params
        })
    }

    return (
        <Container title={data?.data.description ?? 'Class'}>
            {
                data && data?.data &&
                <div className='d-flex flex-column gap-3'>
                    <ClassData data={data.data} refreshData={refreshData}/>

                    <ul className='nav nav-tabs'>
                        <li className='nav-item' onClick={() => handleTab(TABS.Students)}>
                            <span className={`nav-link ${currentTab === TABS.Students ? 'active' : ''}`}>Students</span>
                        </li>
                        <li className='nav-item' onClick={() => handleTab(TABS.Tests)}>
                            <span className={`nav-link ${currentTab === TABS.Tests ? 'active' : ''}`}>Tests</span>
                        </li>
                        <li className='nav-item' onClick={() => handleTab(TABS.Attendances)}>
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