import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { Button, Loading, SearchBar } from '../basics'
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../providers/UserProvider'
import { USER_ROLES } from '../../constants/roles'
import { useClassStudents, useSwitch } from '../../hooks'
import { SubjectServices } from '../../services'
import { useSettingsContext } from '../providers/SettingsProvider'

const useDeleteStudent = ({ idClass, refreshData }) => {
    const [isLoading, setIsLoading] = useState(false)

    const deleteStudent = async (idStudent) => {
        try {
            setIsLoading(true)
            //const response = await SubjectServices.leaveClassroomAsStudent({ idClass, idUser: idStudent })
            //if (response.status === 200) {
            //    refreshData()
            //}
            console.log('Deleting...')
            setTimeout(() => {}, 5000)
        } catch (error) {
            console.log(error)
        } finally {
            //setIsLoading(false)
        }
    }

    return {
        isLoading,
        deleteStudent
    }
}

const ClassStudents = ({ idClass }) => {
    const { language } = useSettingsContext()
    const { user } = useUserContext()
    const { mode, toggleSwitch } = useSwitch()
    const [search, setSearch] = useState('')
    const { isLoading, data, refreshData } = useClassStudents({ idClass, search })
    const { isLoadingDelete, deleteStudent } = useDeleteStudent({ idClass, refreshData })

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex gap-3'>
                <SearchBar placeholder={language.messages.Search} handleSearch={setSearch}/>

                { 
                    [USER_ROLES.Admin, USER_ROLES.Professor].includes(user.role.id) &&
                    <Button
                        className='btn-outline-secondary rounded-5'
                        icon={faList}
                        text={language.buttons.Edit}
                        handleOnClick={toggleSwitch}
                        isActived={mode}
                    />
                }
            </div>
            {
                isLoading
                ? <Loading/>
                : data?.data.length
                    ? data.data.map((student, index) =>
                        <div key={student.id} className='d-flex gap-2'>
                            <Link to={`${Routes.Users}/${student.id}`} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                                <div className='card-body'>
                                    {`${student.surnames} ${student.names}`}
                                </div>
                            </Link>
        
                            {
                                mode &&
                                <Button
                                    className='btn-outline-system'
                                    icon={faTrash}
                                    handleOnClick={() => deleteStudent(student.id)}
                                    isLoading={isLoadingDelete}
                                    isDisabled={isLoadingDelete}
                                />
                            }
                        </div>
                    )
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

export default ClassStudents