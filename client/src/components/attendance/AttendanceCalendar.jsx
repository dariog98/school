import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInTimeZone, getWeeksInMonth, isTheSameDate } from '../../constants/date'
import { useDate } from '../../hooks'
import { Button } from '../basics'
import { useSettingsContext } from '../providers/SettingsProvider'

const ArrowIcon = { width: '2rem', height: '2rem', margin: 0 }
const buttonStyle = { width: '2.5rem', height: '2.5rem' }

const AttendanceCalendar = ({ currentDate, handleDate }) => {
    const { language } = useSettingsContext()
    const { date, goToPrevMonth, goToNextMonth } = useDate(getStringDateInTimeZone(currentDate, 'UTC'))

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='fw-bolder'>{date.toLocaleString('EN', { year: 'numeric', month: 'long', timeZone: 'UTC' })}</span>
                <div className='d-flex gap-3'>
                    <Button
                        className='btn-outline-system rounded-5'
                        style={ArrowIcon}
                        icon={faArrowLeft}
                        handleOnClick={goToPrevMonth}
                    />
                    <Button
                        className='btn-outline-system rounded-5'
                        style={ArrowIcon}
                        icon={faArrowRight}
                        handleOnClick={goToNextMonth}
                    />
                </div>
            </div>

            <div className='card p-3' style={{ height: '410px' }}>
                <div className='d-flex flex-column gap-3'>
                <div className='d-flex justify-content-between'>
                    {language.days.map((day, index)=> <div key={index} className='d-flex justify-content-center align-items-center' style={buttonStyle}>{day.charAt(0)}</div>)}
                </div>
                {
                    getWeeksInMonth(date.getUTCFullYear(), date.getUTCMonth()).map((week, weekIndex) => 
                        <div className='d-flex justify-content-between' key={weekIndex}>
                            {
                                week.map((dateMonth, dayIndex) => {
                                    const isActived = isTheSameDate(dateMonth, currentDate)
                                    return (
                                        <Button
                                            key={dayIndex}
                                            className={`${date.getUTCMonth() !== dateMonth.getUTCMonth() && 'text-secondary'} ${isActived ? 'btn-primary text-light' :'btn-outline-system'} rounded-circle border-0`}
                                            text={dateMonth.getUTCDate()}
                                            handleOnClick={() => handleDate(getStringDateInTimeZone(dateMonth, 'UTC'))}
                                            style={buttonStyle}
                                            isActived={isActived}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default AttendanceCalendar