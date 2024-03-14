import { Button, Container, Loading, MainContainer, Navbar, NotFound } from '../components/basics'
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

    if (data && data.status === 404) {
        throw new Error('User not found')
    }

    return (
        isLoading
        ? 
        <MainContainer>
            <div className='max-content d-flex justify-content-center align-items-center'>
                <Loading/>
            </div>
        </MainContainer>
        : data?.status === 200 && 
            <Container>
                <UserData data={data.data}/>
            </Container>
    )
}

export default User