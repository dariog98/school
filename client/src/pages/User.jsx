import { Container } from '../components/basics'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks'
import UserData from '../components/user/UserData'
import UserClasses from '../components/user/UserClasses'
import { USER_ROLES } from '../constants/roles'

const User = () => {
    const { id: idUser } = useParams()
    const { isLoading, data } = useUser({ idUser })

    return (
        <Container>
            <div className='d-flex flex-column'>
                {
                    !isLoading && data &&
                    <div className='d-flex flex-column gap-5'>
                        <UserData data={data.data}/>
                        {data.data.role_id === USER_ROLES.Student && <UserClasses classes={data.data.classrooms}/>}

                    </div>
                }
            </div>
        </Container>
    )
}

export default User