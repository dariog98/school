import { useParams } from 'react-router-dom'
import { ButtonLink, Container, Loading, MainContainer, NotFound, Title } from '../components/basics'
import { useClass, useCustomSearchParams } from '../hooks'
import { ClassAttendances, ClassData, ClassStudents, ClassTests } from '../components/class'
import { Routes } from '../constants/routes'
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

const TabItem = ({ currentTab, tab, handleTab, name }) => {
    return (
        <li className='nav-item' onClick={() => handleTab(tab)}>
            <span className={`nav-link ${currentTab === tab ? 'active' : ''}`}>{name}</span>
        </li>
    )
}

const Class = () => {
    const tab = useCustomSearchParams('tab')
    const { id: idClass } = useParams()
    const { language } = useSettingsContext()
    const { isLoading, data, refreshData } = useClass({ idClass })
    const CurrentTab = TAB_COMPONENTS[tab.getItem() ?? TABS.Students]

    if (data && data.status === 404) {
        throw new Error('Class not found')
    }

    return (
        isLoading
        ?
        <MainContainer>
            <div className='max-content d-flex justify-content-center align-items-center'>
                <Loading/>
            </div>
        </MainContainer>
        : data?.status === 200 &&
            <Container>
                <div className='d-flex flex-column gap-3'>
                    <Title text={data.data.description}>
                        <ButtonLink
                            to={Routes.Classes}
                            className='btn-outline-system rounded-5'
                            icon={faArrowLeft}
                            text={language.buttons.GoBack}
                        />
                    </Title>

                    <ClassData idClass={idClass} data={data.data} refreshData={refreshData}/>

                    <ul className='nav nav-tabs'>
                        <TabItem name='Students' currentTab={tab.getItem() ?? TABS.Students} tab={TABS.Students} handleTab={tab.setItem}/>
                        <TabItem name='Tests' currentTab={tab.getItem()} tab={TABS.Tests} handleTab={tab.setItem}/>
                        <TabItem name='Attendances' currentTab={tab.getItem()} tab={TABS.Attendances} handleTab={tab.setItem}/>
                    </ul>

                    <CurrentTab idClass={idClass}/>
                </div>
            </Container>
    )
}

export default Class