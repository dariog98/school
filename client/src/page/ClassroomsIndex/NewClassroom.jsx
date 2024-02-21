import { Box, Button, useDisclosure } from '@chakra-ui/react'
import ModalTemplate from '../Basics/ModalTemplate'
import CustomInput from '../Basics/CustomInput'
import { useForm } from 'react-hook-form'
import { required } from '../../constants/formErrors'
import useClasstimes from '../Classroom/hooks/useClasstimes'

const NewClassroom = ({ handleCreate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, formState: { errors }, reset, handleSubmit } = useForm()
    const { classtimes } = useClasstimes()
    const formManager = { register, errors }

    const handleConfirm = async (data) => {
        const result = await handleCreate(data)
        console.log(result)
        if (result.status === 200) {
            onClose()
        }
    }

    const handleOpen = () => {
        reset()
        onOpen()
    }

    return (
        <>
            <Button colorScheme='blue' onClick={handleOpen}>Añadir</Button>

            <ModalTemplate title='Añadir' handleClose={onClose} isOpen={isOpen} handleConfirm={handleSubmit(handleConfirm)}>
                <Box display='flex' flexDirection='column' gap='0.5rem'>
                    <CustomInput formManager={formManager} before='Descripción' name='description' type='text' validations={{ required }}/>
                    <CustomInput formManager={formManager} before='Turno' name='classtime' type='select' options={classtimes.map(classtime => { return { description: classtime.description, value: classtime.id}})}/>
                </Box>
            </ModalTemplate>
        </>
    )
}

export default NewClassroom