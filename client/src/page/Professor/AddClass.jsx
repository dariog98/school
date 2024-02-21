import { Box, Button, useDisclosure } from '@chakra-ui/react'
import ModalTemplate from '../Basics/ModalTemplate'
import Search from '../Basics/Search'
import useClassrooms from '../ClassroomsIndex/hooks/useClassrooms'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const AddClass = ({ handleSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleDescription, classrooms } = useClassrooms()
    const [currentSelected, setCurrentSelected] = useState()

    const handleConfirm = () => {
        if (currentSelected) {
            handleSubmit(currentSelected)
            onClose()
        }
    }

    const handleOpen = () => {
        setCurrentSelected(undefined)
        onOpen()
    }

    return (
        <>
            <Button colorScheme='blue' onClick={handleOpen}>Añadir clase</Button>
            <ModalTemplate title='Añadir clase' handleClose={onClose} isOpen={isOpen} handleConfirm={handleConfirm}>
                <Box display='flex' flexDirection='column' gap='0.5rem'>
                    <Search handleSearch={handleDescription}/>
                    <Box display='flex' flexDirection='column' gap='0.5rem'>
                        {
                            currentSelected
                            ? <Box display='flex' gap='0.5rem'>
                                <Box flexGrow='1' borderWidth='1px' borderRadius='lg' p='0.5rem 1rem' background='blue.500' color='white'>
                                    {classrooms.find(classroom => classroom.id === currentSelected).description}
                                </Box>
                                <Button h='inherit' w='3rem' colorScheme='red' onClick={() => setCurrentSelected(undefined)}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </Button>
                            </Box>
                            : classrooms.map(classroom =>
                                <Box key={classroom.id} borderWidth='1px' borderRadius='lg' p='0.5rem 1rem' _hover={{ background: 'blue.500', color: 'white' }} onClick={() => setCurrentSelected(classroom.id)}>
                                    {classroom.description}
                                </Box>
                            )
                        }
                    </Box>
                </Box>
            </ModalTemplate>
        </>
    )
}

export default AddClass