import { Box, Stack, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import CustomInput from './CustomInput'

const Form = ({ defaultValues, inputs, isEditMode, handleCloseEditMode, handleAction }) => {
    const { register, reset, formState: { errors },handleSubmit } = useForm({ defaultValues })
    const formManager = { register, errors }

    const handleCancel = () => {
        handleCloseEditMode()
        reset(defaultValues)
    }

    const handleConfirm = async (data) => {
        const result = await handleAction(data)
        if (result.status === 200) {
            handleCloseEditMode()
        }
    }

    return (
        <Box display='flex' flexDirection='column' gap='1rem'>
            <Stack spacing='1rem'>
                {
                    inputs.map((input, index) =>
                        <CustomInput
                            key={index}
                            formManager={formManager}
                            before={input.label}
                            name={input.name}
                            type={input.type}
                            isReadOnly={!isEditMode}
                            validations={input?.validations}
                            options={input?.options}
                        />
                    )
                }
            </Stack>

            {
                isEditMode &&
                <Box display='flex' gap='1rem' justifyContent='flex-end'>
                    <Button onClick={handleSubmit(handleConfirm)} colorScheme='green'>Guardar</Button>
                    <Button onClick={handleCancel} colorScheme='red'>Cancelar</Button>
                </Box>
            }

        </Box>
    )
}

export default Form