import { useClassAttendance } from '../../hooks'
import Loading from '../basics/Loading'

const ClassAttendances = ({ idClass }) => {
    const { isLoading, data } = useClassAttendance({ idClass })

    return (
        <div>
            {
                isLoading
                ? <Loading/>
                : data?.data &&
                <div className='d-flex flex-column gap-3'>
                    {
                        data.data.map((student, index) =>
                            <div key={student.id} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                                <div className='card-body d-grid' style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr'}}>
                                    <div>{`${student.surnames} ${student.names}`}</div>
                                    <div className='text-end'>{`Presents: ${String(student.attendances.presents).padStart(2, '0')}`}</div>
                                    <div className='text-end'>{`Absents: ${String(student.attendances.absents).padStart(2, '0')}`}</div>
                                    <div className='text-end'>{`Lates: ${String(student.attendances.lates).padStart(2, '0')}`}</div>
                                </div>                               
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default ClassAttendances