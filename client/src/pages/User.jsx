import { Button, Container } from '../components/basics'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks'
import UserData from '../components/user/UserData'
import UserClasses from '../components/user/UserClasses'
import { USER_ROLES } from '../constants/roles'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../components/providers/UserProvider'

const User = () => {
    const { user } = useUserContext()
    const { id: idUser } = useParams()
    const { isLoading, data } = useUser({ idUser })

    return (
        <Container>
            <div className='d-flex flex-column'>
                {
                    !isLoading && data &&
                    <div className='d-flex flex-column gap-3'>
                        <UserData data={data.data}/>
                        {
                            idUser === user.idUser &&
                            <div>
                                <Button
                                    className='btn-danger rounded-5'
                                    text='Log out'
                                    icon={faPowerOff}
                                />
                            </div>
                        }

                        {data.data.role_id === USER_ROLES.Student && <UserClasses classes={data.data.classrooms}/>}
                    </div>
                }
            </div>
        </Container>
    )
}

export default User