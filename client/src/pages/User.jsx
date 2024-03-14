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
    /*
    return (
        <Container>
            <div className='d-flex flex-column'>
                {
                    isLoading
                    ? <Loading/>
                    : data?.data
                        ?
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
                        : <div className='max-content d-flex justify-content-center align-items-center'>
                            <NotFound/>
                        </div>
                }
            </div>
        </Container>
    )
    */
    return (
        isLoading
        ? 
        <Container>
            <Loading/>
        </Container>
        : data?.data
            ?
            <Container>
                <UserData data={data.data}/>
            </Container>
            :
            <MainContainer>
                <div className='max-content d-flex justify-content-center align-items-center'>
                    <NotFound/>
                </div>
            </MainContainer>
    )
}

export default User