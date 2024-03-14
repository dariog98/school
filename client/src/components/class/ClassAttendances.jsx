import { useState } from 'react'
import { useClassAttendance } from '../../hooks'
import { ButtonLink, Loading, SearchBar } from '../basics'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { Routes } from '../../constants/routes'
import { useSettingsContext } from '../providers/SettingsProvider'

const ClassAttendances = ({ idClass }) => {
    const { language } = useSettingsContext()
    const [search, setSearch] = useState('')
    const { isLoading, data } = useClassAttendance({ idClass, search })

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex gap-3'>
                <SearchBar placeholder={language.messages.Search} handleSearch={setSearch}/>

                <ButtonLink
                    to={`${Routes.Classes}/${idClass}/attendances`}
                    className='btn-primary'
                    icon={faCalendarDays}
                    text={language.buttons.Add}
                />
            </div>
            {
                isLoading
                ?
                <div className='my-5'>
                    <Loading/>
                </div>
                : data?.data.length
                    ?
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
                    :
                    <div className='card shadow-sm bg-body-secondary'>
                        <div className='card-body'>
                            {language.messages.NoStudentsClass}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ClassAttendances