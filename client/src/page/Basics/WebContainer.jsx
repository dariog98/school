import Navbar from './Navbar'
import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const WebContainer = () => {
    return (
        <Box flexGrow='1'>
            <Navbar/>
            <Container p='1rem' maxW='container.md'>
                <Outlet/>
            </Container>
        </Box>
    )
}

export default WebContainer