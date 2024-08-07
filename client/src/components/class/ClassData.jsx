import { faPen, faPlus, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonLink } from '../basics'
import { useUserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { USER_ROLES } from '../../constants/roles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useStudentClass } from '../../hooks'

const AddProfessorButton = () => {
    return (
        <div className='cursor-pointer underline-on-hover'>
            <FontAwesomeIcon icon={faPlus}/>
            <span className='ps-1'>Add professor</span>
        </div>
    )
}
/*
const ClassData = ({ data, refreshData }) => {
    const { user } = useUserContext()

    const handleJoinClass = async () => {
        try {
            const resolver = {}
            resolver[USER_ROLES.Professor] = async ({ idClass, idUser }) => await SubjectServices.joinClassroomAsProfessor({ idClass, idUser })
            resolver[USER_ROLES.Student] = async ({ idClass, idUser }) => await SubjectServices.joinClassroomAsStudent({ idClass, idUser })
            
            const response = await resolver[user.role.id]({ idClass: data.id, idUser: user.idUser })
            
            if (response.status === 200) {
                refreshData()
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='d-flex justify-content-between'>
            <div className='d-flex justify-content-between gap-3'>
                <div className='flex-grow-1 gap-3' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div>
                        <div className='fw-bold'>Professors</div>
                        <div>
                            <div className='d-flex flex-column align-items-end gap-1'>
                                {
                                    data.professors.map(professor =>
                                        <div key={professor.id} className='d-flex justify-content-between'>
                                            <Link to={`${Routes.Users}/${professor.id}`} className='underline-on-hover'>
                                                {`${professor.surnames} ${professor.names}`}
                                            </Link>
                                        </div>
                                    )
                                }
                                <AddProfessorButton/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='fw-bold'>Students</div>
                            <div className='d-flex'>
                                <div>{`Total ${String(data.totalStudents).padStart(2, '0')}`}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='fw-bold'>Classes</div>
                            <div className='d-flex'>
                                <div>{`Total ${String(data.totalClasses).padStart(2, '0')}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column gap-2'>
                    {
                        user.role.id === USER_ROLES.Student && (
                            data.students.map(s => s.id).includes(user.idUser) ?
                            <Button
                                className='btn-danger'
                                icon={faUserMinus}
                                text='Leave Class'
                            />
                            :
                            <Button
                                className='btn-success'
                                icon={faUserPlus}
                                text='Join Class'
                            />
                        )
                    }
                </div>
            </div>

            <div>
                <ButtonLink
                    to={`${Routes.Classes}/${data.id}/edit`}
                    className='btn-outline-secondary rounded-5'
                    icon={faPen}
                    text='Edit'
                />
            </div>
        </div>
    )
}

export default ClassData

*/

const ClassData = ({ idClass, data }) => {
    const { user } = useUserContext()
    const { isLoading, handleJoin, handleLeave } = useStudentClass()

    return (
        <div className='d-flex justify-content-between'>
            <div className='d-flex justify-content-between gap-3'>
                <div className='flex-grow-1 gap-3'>
                    <div>
                        <div className='fw-bold'>Professors</div>
                        <div>
                            <div className='d-flex flex-column align-items-end gap-1'>
                                {
                                    data.professors.length ?
                                    data.professors.map(professor =>
                                        <div key={professor.id} className='d-flex justify-content-between'>
                                            <Link to={`${Routes.Users}/${professor.id}`} className='underline-on-hover'>
                                                {`${professor.surnames} ${professor.names}`}
                                            </Link>
                                        </div>
                                    )
                                    : <div>
                                        <span>No professors added to the class</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {/*
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Total students</th>
                                    <td className='text-end'>{data.totalStudents}</td>
                                </tr>
                                <tr>
                                    <th>Total classes taught</th>
                                    <td className='text-end'>{data.totalClasses}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    */}
                </div>
            </div>

            <div className='d-flex flex-column gap-2'>
                {
                    [USER_ROLES.Admin, USER_ROLES.Professor].includes(user.role.id) &&
                    <ButtonLink
                        to={`${Routes.Classes}/${data.id}/edit`}
                        className='btn-outline-secondary rounded-5'
                        icon={faPen}
                        text='Edit'
                    />
                }

                {
                    user.role.id === USER_ROLES.Student && (
                        data.students.map(student => student.id).includes(user.idUser)
                            ?
                            <Button
                                className='btn-outline-danger rounded-5'
                                icon={faUserMinus}
                                text='Leave Class'
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                handleOnClick={() => handleLeave(idClass)}
                            />
                            :
                            <Button
                                className='btn-outline-success rounded-5'
                                icon={faUserPlus}
                                text='Join Class'
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                handleOnClick={() => handleJoin(idClass)}
                            />
                    )
                }
            </div>
        </div>
    )
}

export default ClassData