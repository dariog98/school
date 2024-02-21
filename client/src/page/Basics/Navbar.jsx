import { Link as ReachLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faChalkboardTeacher, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '../../constants/Routes'
import { Box, Text, Link, Button } from '@chakra-ui/react'
import { useUserContext } from './UserProvider'

const PagesButton = ({ route, title, icon }) => {
    const location = useLocation()
    const isActive = location.pathname === route
    
    return (
        <Link as={ReachLink} to={route} style={{ textDecoration: 'none' }}>
            <Box display='flex' flexDirection='column' alignItems='center' color={isActive && 'blue.500'} >
                <FontAwesomeIcon icon={icon} style={{ width: '2rem', height: '2rem' }}/>
                <Text>{title}</Text>
            </Box>
        </Link>
    )
}

const Navbar = () => {
    const { user, handleLogOut } = useUserContext()

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' h='5rem' borderBottomWidth='1px' p='0rem 2rem'>
            <Box display='flex' gap='3rem'>
                <PagesButton route={ROUTES.Classrooms} icon={faSchool} title='Clases'/>
                <PagesButton route={ROUTES.Professors} icon={faChalkboardTeacher} title='Profesores'/>
                <PagesButton route={ROUTES.Students} icon={faUsers} title='Alumnos'/>
            </Box>

            {
                user &&
                <Box display='flex' gap='0.5rem' alignItems='center'>
                    <Box>
                        <Text>@{user.username}</Text>
                    </Box>
                    <Button colorScheme='orange' onClick={handleLogOut}><FontAwesomeIcon icon={faPowerOff}/></Button>
                </Box>
            }
        </Box>
    )
}

export default Navbar