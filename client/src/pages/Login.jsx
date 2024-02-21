import { Button, Card, Input, Password } from '../components/basics'
import { useLogin, useSwitch } from '../hooks'

const Login = () => {
    const { form } = useLogin()
    const { mode, toggleSwitch } = useSwitch()

    return (
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center' style={{
            background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
        }}>
            <Card style={{ width: '450px' }}>
                <div className='d-flex flex-column gap-3'>

                    <div className='text-center'>
                        <span className='fw-bolder fs-2'>Welcome</span>
                    </div>

                    <Input
                        label='Username'
                        name='username'
                        form={form}
                    />

                    <Password
                        label='Password'
                        name='password'
                        form={form}
                        see={mode}
                        handleSee={toggleSwitch}
                    />

                    <Button
                        className='btn-primary flex-grow-1'
                        text='Login'
                        handleOnClick={form.handleSubmit}
                    />

                </div>
            </Card>
        </div>
    )
}

export default Login