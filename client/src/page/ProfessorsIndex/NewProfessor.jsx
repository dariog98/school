import { Box, Button, useDisclosure } from '@chakra-ui/react'
import ModalTemplate from '../Basics/ModalTemplate'
import CustomInput from '../Basics/CustomInput'
import { useForm } from 'react-hook-form'
import { required } from '../../constants/formErrors'

const NewProfessor = ({ handleCreate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, formState: { errors }, reset, handleSubmit } = useForm()
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
                    <CustomInput formManager={formManager} before='Apellidos' name='surnames' type='text' validations={{ required }}/>
                    <CustomInput formManager={formManager} before='Nombres' name='names' type='text' validations={{ required }}/>
                    <CustomInput formManager={formManager} before='DNI' name='dni' type='number' validations={{ required }}/>
                    <CustomInput formManager={formManager} before='Fecha de Nacimiento' name='birthdate' type='date' validations={{ required }}/>
                    <CustomInput formManager={formManager} before='Teléfono' name='phone' type='text'/>
                    <CustomInput formManager={formManager} before='Dirección' name='address' type='text'/>
                </Box>
            </ModalTemplate>
        </>
    )
}

export default NewProfessor