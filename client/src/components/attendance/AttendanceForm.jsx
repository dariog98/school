import { faArrowLeft, faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useClassAttendanceForm } from '../../hooks'
import { Button } from '../basics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getStringDateInLanguageTimeZone } from '../../constants/date'
import { useSettingsContext } from '../providers/SettingsProvider'

const style = { width: '2rem', height: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }
const ArrowIcon = { width: '2rem', height: '2rem', margin: 0 }

const AttendanceForm = ({ idClass, date, status, students, handlePrevDate, handleNextDate }) => {
    console.log({status})
    const { language } = useSettingsContext()
    const { form, isLoading } = useClassAttendanceForm({ idClass, date, data: students })

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='fw-bolder'>{getStringDateInLanguageTimeZone(date, 'EN', 'UTC')}</span>
                <div className='d-flex gap-3'>
                    {
                        true &&
                        <div
                            className='d-flex justify-content-center align-items-center text-light bg-body-violet rounded-5'
                            style={ArrowIcon}
                            title='Saved'
                        >
                            <FontAwesomeIcon icon={faFloppyDisk}/>
                        </div>
                    }

                    <Button
                        className='btn-outline-system rounded-5'
                        style={ArrowIcon}
                        icon={faArrowLeft}
                        handleOnClick={handlePrevDate}
                    />
                    <Button
                        className='btn-outline-system rounded-5'
                        style={ArrowIcon}
                        icon={faArrowRight}
                        handleOnClick={handleNextDate}
                    />
                </div>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='fw-bolder'>Students</span>
                        <div className='d-flex gap-3'>
                            <span className='fw-bolder' style={style} title='Present'>P</span>
                            <span className='fw-bolder' style={style} title='Absent'>A</span>
                            <span className='fw-bolder' style={style} title='Late'>L</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                students.map((student, index) =>
                    <div key={student.id} className={`card ${!(index % 2) ?  'bg-body-secondary' : ''}`}>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <span className='overflow-hidden text-truncate'>{`${String(index + 1).padStart(2, '0')} ${student.surnames} ${student.names}`}</span>
                                <div className='d-flex gap-3'>
                                    <div style={style}><input className='form-check-input' { ...form.register(String(student.id)) } value='1' type='radio'/></div>
                                    <div style={style}><input className='form-check-input' { ...form.register(String(student.id)) } value='2' type='radio'/></div>
                                    <div style={style}><input className='form-check-input' { ...form.register(String(student.id)) } value='3' type='radio'/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='d-flex justify-content-end gap-2'>
                <Button
                    className='btn-violet rounded-5'
                    text={language.buttons.Save}
                    handleOnClick={form.handleSubmit}
                    icon={faFloppyDisk}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                />
            </div>
        </>
    )
}

export default AttendanceForm
