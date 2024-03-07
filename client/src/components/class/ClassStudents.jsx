import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { Button, SearchBar } from '../basics'
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../providers/UserProvider'
import { USER_ROLES } from '../../constants/roles'
import { useSwitch } from '../../hooks'
import { SubjectServices } from '../../services'

const ClassStudents = ({ idClass, students, refreshData }) => {
    const { user } = useUserContext()
    const { mode, toggleSwitch } = useSwitch()

    const deleteStudent = async (idStudent) => {
        try {
            const response = await SubjectServices.leaveClassroomAsStudent({ idClass, idUser: idStudent })
            if (response.status === 200) {
                refreshData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex gap-3'>
                <SearchBar placeholder='Search...'/>

                <Button
                    className='btn-outline-secondary'
                    icon={faList}
                    text='Edit'
                    handleOnClick={toggleSwitch}
                    isActived={mode}
                />
            </div>
            {
                students.map((student, index) =>
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
                        />
                    }

                </div>
                )
            }
        </div>
    )
}
{/*
const ClassStudents = ({ students }) => {
    return (
        <div className='border rounded-2 overflow-hidden'>
            <table className='table table-striped'>
                <thead className='bg-body-secondary'>
                    <tr>
                        <th>Surnames</th>
                        <th>Names</th>
                        <th>Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student =>
                            <tr key={student.id}>
                                <td>{student.surnames}</td>
                                <td>{student.names}</td>
                                <td>{student.birthdate}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
*/}

export default ClassStudents