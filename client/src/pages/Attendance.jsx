import { useParams, useSearchParams } from 'react-router-dom'
import { Container } from '../components/basics'
import { useClassAttendance, useDate } from '../hooks'
import AttendanceForm from '../components/attendance/AttendanceForm'
import AttendanceCalendar from '../components/attendance/AttendanceCalendar'
import { useQuery } from '@tanstack/react-query'
import { RoutesAPI } from '../constants/api'
import { getStringDateInTimeZone } from '../constants/date'

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
                </div>
            </div>
        </Container>
    )
}

export default Attendance