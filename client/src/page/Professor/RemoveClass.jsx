import { Box, Text } from '@chakra-ui/react'
import ModalTemplate from '../Basics/ModalTemplate'
import useClassroom from '../Classroom/hooks/useClassroom'

const RemoveClass = ({ handleSubmit, idClassroom, handleClose, isOpen }) => {
    const { classroom } = useClassroom(idClassroom)
    
    const handleConfirm = () => {
        if (idClassroom) {
            handleSubmit(idClassroom)
            handleClose()
        }
    }

    return (
        <>
            <ModalTemplate title='Remover clase' handleClose={handleClose} isOpen={isOpen} handleConfirm={handleConfirm}>
                <Box display='flex' flexDirection='column' gap='0.5rem'>
                    <Text>¿Está seguro que desea remover la siguiente clase?</Text>

                    {
                        classroom &&
                        <Box borderWidth='1px' borderRadius='lg' p='0.5rem 1rem' background='blue.500' color='white'>
                            {classroom.description}
                        </Box>
                    }
                </Box>
            </ModalTemplate>
        </>
    )
}

export default RemoveClass