import { useParams } from 'react-router-dom'
import { Button, ButtonLink, Container } from '../components/basics'
import { useClass } from '../hooks'
import ClassStudents from '../components/class/ClassStudents'
import ClassData from '../components/class/ClassData'
import { Routes } from '../constants/routes'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

const Subject = () => {
    const { id: idClass } = useParams()
    const { data } = useClass({ idClass })

    return (
        <Container title={data?.data.description ?? 'Class'}>
            {
                data && data?.data &&
                <div className='d-grid gap-3' style={{ gridTemplateColumns: '2fr 1fr' }}>
                    <div className='d-flex flex-column gap-3'>
                        <ClassData data={data.data}/>

                        <div className='d-flex'>
                            <ButtonLink
                                className='btn-success'
                                icon={faCalendar}
                                text='Attendance'
                                to={`${Routes.Classes}/${idClass}/attendances`}
                            />
                        </div>
                    </div>
                    <div>
                        <ClassStudents students={data.data.students}/>
                    </div>
                </div>
            }
        </Container>
    )
}

export default Subject