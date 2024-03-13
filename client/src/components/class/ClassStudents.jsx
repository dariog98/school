import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { Button, SearchBar } from '../basics'
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../providers/UserProvider'
import { USER_ROLES } from '../../constants/roles'
import { useClassStudents, useSwitch } from '../../hooks'
import { SubjectServices } from '../../services'

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
    const { user } = useUserContext()
    const { mode, toggleSwitch } = useSwitch()
    const [search, setSearch] = useState('')
    const { isLoading, data, refreshData } = useClassStudents({ idClass, search })
    const { isLoadingDelete, deleteStudent } = useDeleteStudent({ idClass, refreshData })

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex gap-3'>
                <SearchBar placeholder='Search...' handleSearch={setSearch}/>

                <Button
                    className='btn-outline-secondary'
                    icon={faList}
                    text='Edit'
                    handleOnClick={toggleSwitch}
                    isActived={mode}
                />
            </div>
            {
                isLoading
                ? <></>
                : (data?.data && data?.data.length)
                    ? data.data.map((student, index) =>
                        <div key={student.id} className='d-flex gap-2'>
                            <Link to={`${Routes.Users}/${student.id}`} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                                <div className='card-body'>
                                    {`${student.surnames} ${student.names}`}
                                </div>
                            </Link>
        
                            {
                                (user.role.id !== USER_ROLES.Student && mode) &&
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
                            There are no students enrolled in this class
                        </div>
                    </div>
            }
        </div>
    )
}

export default ClassStudents