import { Text, Link } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'

const ItemBox = ({ title, route }) => {
    return (
        <Link as={ReachLink} to={route} borderWidth='1px' borderRadius='lg' p='1rem' flexGrow='1' _hover={{ background: 'blue.500', color: 'white' }} style={{ textDecoration: 'none' }}>
            <Text fontSize='1rem'>{title}</Text>
        </Link>
    )
}

export default ItemBox