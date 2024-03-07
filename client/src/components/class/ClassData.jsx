import { faPlus, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../basics'
import { useUserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { SubjectServices } from '../../services'
import { USER_ROLES } from '../../constants/roles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddProfessorButton = () => {
    return (
        <div className='cursor-pointer underline-on-hover'>
            <FontAwesomeIcon icon={faPlus}/>
            <span className='ps-1'>Add professor</span>
        </div>
    )
}

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
        <div>
            <div className='fs-4'>{data.description}</div>
            <div className='d-flex justify-content-between gap-3'>
                <div className='flex-grow-1 d-grid gap-3' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
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
                            <div className='d-flex justify-content-end'>
                                <div>{`Total ${String(data.totalStudents).padStart(2, '0')}`}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='fw-bold'>Classes</div>
                            <div className='d-flex justify-content-end'>
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
        </div>
    )
}

export default ClassData