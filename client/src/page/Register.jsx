import { Box, InputGroup, InputRightElement, Input, Button, Spinner, Link, Text } from '@chakra-ui/react'
import useRegister from './Register/hooks/useRegister'
import { Link as ReachLink } from 'react-router-dom'
import { useState } from 'react'
import { ROUTES } from '../constants/Routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSchool } from '@fortawesome/free-solid-svg-icons'
import { required } from '../constants/formErrors'
import CustomInput from './Basics/CustomInput'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { loading, formManager, handleSubmit } = useRegister()

    const checkPassword = () => {
        const password = formManager.getValues('password')
        const passwordConfirm = formManager.getValues('passwordConfirm')
        return password === passwordConfirm || 'Las contraseñas no coinciden'
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%' h='100vh'>

            <Box display='flex' flexDirection='column' gap='2rem' alignItems='center'>
                <FontAwesomeIcon icon={faSchool} style={{ width: '10rem', height: '10rem' }}/>
                <Text fontSize='3rem' fontWeight='bold'>Sistema de Gestión Universitario</Text>
            </Box>

            <Box display='flex' flexDirection='column' gap='1rem' justifyContent='center' alignItems='center' borderWidth='0' padding='4rem 2rem' borderRadius='lg'>

                <Box display='flex' flexWrap='wrap' gap='1rem'>
                    <CustomInput formManager={formManager} name='surnames' type='text' placeholder='Apellidos' validations={{ required }}/>
                    <CustomInput formManager={formManager} name='names' type='text' placeholder='Nombres' validations={{ required }}/>
                </Box>
                
                <Box display='flex' flexWrap='wrap' gap='1rem'>
                    <CustomInput formManager={formManager} name='username' type='text' placeholder='Username' validations={{ required }}/>
                    <CustomInput formManager={formManager} name='phone' type='text' placeholder='Teléfono'/>
                </Box>

                <Box display='flex' flexDirection='column' w='100%' gap='1rem'>
                    <CustomInput formManager={formManager} name='address' type='text' placeholder='Dirección'/>
                </Box>

                <Box display='flex' flexDirection='column' w='100%' gap='0.5rem'>
                    <InputGroup size='md'>
                        <Input type={showPassword ? 'text' : 'password'} placeholder='Contraseña' { ...formManager.register('password', { required: required }) }/>
                        <InputRightElement>
                            <Button colorScheme='teal' onClick={() => setShowPassword(show => !show)}>
                            {showPassword ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Box w='100%' display={formManager.errors?.password ? 'inherit' : 'none'} fontSize='0.75rem'>
                        <Text color='red'>{formManager.errors?.password?.message}</Text>
                    </Box>
                </Box>

                <Box display='flex' flexDirection='column' w='100%' gap='0.5rem'>
                    <InputGroup size='md'>
                        <Input type={showPassword ? 'text' : 'password'} placeholder='Confirmar contraseña' { ...formManager.register('passwordConfirm', { required: required, validate: checkPassword }) }/>
                        <InputRightElement>
                            <Button colorScheme='teal' onClick={() => setShowPassword(show => !show)}>
                            {showPassword ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Box w='100%' display={formManager.errors?.passwordConfirm ? 'inherit' : 'none'} fontSize='0.75rem'>
                        <Text color='red'>{formManager.errors?.passwordConfirm?.message}</Text>
                    </Box>
                </Box>

                <Button colorScheme='orange' w='8rem' onClick={handleSubmit} disabled={loading}>
                    {loading ? <Spinner/> : 'REGISTRARSE'}
                </Button>

                <Link as={ReachLink} to={ROUTES.Login} mt='0.5rem'>
                    <Text color='blue'>Iniciar sesión</Text>
                </Link>
            </Box>
        </Box>
    )
}

export default Register