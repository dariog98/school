import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Text } from '@chakra-ui/react'

const Subtitle = ({ icon, title, children }) => {
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' color='blue.500'>
            <Box display='flex' gap='0.75rem' alignItems='center'>  
                <FontAwesomeIcon icon={icon} style={{ width: '1.75rem', height: '1.75rem' }}/>
                <Text fontSize='1.5rem' fontWeight='500'>{title}</Text>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default Subtitle