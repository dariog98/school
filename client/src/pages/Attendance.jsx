import { useParams, useSearchParams } from 'react-router-dom'
import { Button, Container } from '../components/basics'
import { useClassAttendance, useDate } from '../hooks'
import { getStringDateInLanguageTimeZone } from '../constants/date'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AttendanceForm from '../components/attendance/AttendanceForm'

const ArrowIcon = { width: '2rem', height: '2rem', margin: 0 }

const Attendance = () => {
    const { id: idClass } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const { date, goToPrevDate, goToNextDate } = useDate(searchParams.get('date'))
    const { isLoading, data } = useClassAttendance({ idClass, date })

    return (
        <Container>
            <div className='d-grid' style={{ gridTemplateColumns: '1fr 2fr' }}>
                <div></div>
                <div className='d-flex flex-column gap-3'>
                    <div className='card bg-body-secondary'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='fw-bolder'>{getStringDateInLanguageTimeZone(date, 'EN', 'UTC')}</span>
                                <div className='d-flex gap-3'>
                                    <Button
                                        className='btn-outline-system rounded-5'
                                        style={ArrowIcon}
                                        icon={faArrowLeft}
                                        handleOnClick={goToPrevDate}
                                    />
                                    <Button
                                        className='btn-outline-system rounded-5'
                                        style={ArrowIcon}
                                        icon={faArrowRight}
                                        handleOnClick={goToNextDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        !isLoading && data &&
                        <AttendanceForm idClass={idClass} date={date} students={data.data}/>
                    }
                </div>
            </div>
        </Container>
    )
}

export default Attendance