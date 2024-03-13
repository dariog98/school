import { useParams, useSearchParams } from 'react-router-dom'
import { Container } from '../components/basics'
import { useClassAttendance, useDate } from '../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import AttendanceForm from '../components/attendance/AttendanceForm'
import AttendanceCalendar from '../components/attendance/AttendanceCalendar'

const Attendance = () => {
    const { id: idClass } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const { date, goToPrevDate, goToNextDate } = useDate(searchParams.get('date'))
    const { isLoading, data } = useClassAttendance({ idClass, date })

    const handleDate = (value) => {
        setSearchParams(params => {
            params.set('date', value)
            return params
        })
    }
    
    return (
        <Container>
            <div className='d-grid gap-5 grid-responsive'>
                
                <div className='d-flex flex-column gap-3'>
                    {
                        !isLoading && data &&
                        <AttendanceForm idClass={idClass} date={date} students={data.data} handleNextDate={goToNextDate} handlePrevDate={goToPrevDate}/>
                    }
                </div>

                <div className='d-flex flex-column gap-3'>
                    <AttendanceCalendar currentDate={date} handleDate={handleDate}/>

                    {
                        (!isLoading && data) && data.attendancesStatus === 'saved' ?
                        <div className='alert alert-primary'>
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
                    }
                </div>
            </div>
        </Container>
    )
}

export default Attendance