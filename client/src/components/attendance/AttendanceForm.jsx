import { useClassAttendanceForm } from '../../hooks'
import { Button } from '../basics'

const style = { width: '2rem', height: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }

const AttendanceForm = ({ idClass, date, students }) => {
    const { form, isLoading } = useClassAttendanceForm({ idClass, date, data: students })

    return (
        <>
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
                                <span className='overflow-hidden text-truncate'>{`${String(index).padStart(2, '0')} ${student.surnames} ${student.names}`}</span>
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
                    className='btn-primary'
                    text='Save'
                    handleOnClick={form.handleSubmit}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                />
            </div>
        </>
    )
}

export default AttendanceForm
