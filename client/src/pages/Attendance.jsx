import { useParams } from 'react-router-dom'
import { Container, Loading, MainContainer } from '../components/basics'
import { useClassAttendance, useCustomSearchParams, useDate } from '../hooks'
import { AttendanceCalendar, AttendanceForm, AttendanceStatus } from '../components/attendance'

const Attendance = () => {
    const { id: idClass } = useParams()
    const dateParam = useCustomSearchParams('date')
    const { date, goToPrevDate, goToNextDate } = useDate(dateParam.getItem())
    const { isLoading, data } = useClassAttendance({ idClass, date })

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
                <div className='d-grid gap-5 grid-responsive'>
                    <div className='d-flex flex-column gap-3'>
                        <AttendanceForm
                            idClass={idClass}
                            date={date}
                            students={data.data}
                            status={data.attendanceStatus}
                            handleNextDate={goToNextDate}
                            handlePrevDate={goToPrevDate}
                        />
                    </div>

                    <div className='d-flex flex-column gap-3'>
                        <AttendanceCalendar currentDate={date} handleDate={dateParam.setItem}/>
                        <AttendanceStatus status={'saved'}/>
                    </div>
                </div>
            </Container>

    )
}

export default Attendance