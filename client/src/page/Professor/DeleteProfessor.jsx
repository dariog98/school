import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/Routes'
import ModalTemplate from '../Basics/ModalTemplate'

const DeleteProfessor = ({ handleDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()

    const handleConfirm = async () => {
        const result = await handleDelete()
        console.log(result)
        console.log(await result.json())
        if (result.status === 200) {
            navigate(ROUTES.Professors)
            onClose()
        }
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>Eliminar</Button>

            <ModalTemplate title='Eliminar' handleClose={onClose} isOpen={isOpen} handleConfirm={handleConfirm}>
                <Box display='flex' flexDirection='column' gap='0.5rem'>
                    <Text>¿Está seguro que desea eliminar?</Text>
                </Box>
            </ModalTemplate>
        </>
    )
}

export default DeleteProfessor