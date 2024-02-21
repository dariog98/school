import { Box, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ItemBox from './ItemBox'

const RemovableItem = ({ title, route, handleRemove }) => {
    return (
        <Box display='flex' gap='0.5rem'>
            <ItemBox title={title} route={route}/>
            <Button h='inherit' w='4rem' colorScheme='red' variant='outline' onClick={handleRemove}>
                <FontAwesomeIcon icon={faXmark}/>
            </Button>
        </Box>
    )
}

export default RemovableItem