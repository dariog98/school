import { Container, Loading, MainContainer, Title } from '../components/basics'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks'
import UserData from '../components/user/UserData'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const User = () => {
    const { language } = useSettingsContext()
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
                <div className='d-flex flex-column gap-3'>
                    <Title text={`${data.data.surnames ?? ''} ${data.data.names ?? ''}`}/>
                    <small className='text-uppercase text-secondary'>{language.roles[data.data.role_id]}</small>
                </div>
                <UserData data={data.data}/>
            </Container>
    )
}

export default User