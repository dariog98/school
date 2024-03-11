import { Button, Card, Input, Password, Navbar, SkoolLogo } from '../components/basics'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useLogin, useSwitch } from '../hooks'

const Login = () => {
    const { language } = useSettingsContext()
    const { form } = useLogin()
    const { mode, toggleSwitch } = useSwitch()

    return (
        <div className='bg-dark'>
            <div className='img-background'/>

            <div className='w-100 vh-100 d-flex flex-column'>
                <Navbar>
                    <SkoolLogo/>
                    <div></div>
                </Navbar>
                <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                    <Card className='rounded-4 border-0 m-2' style={{ width: '450px' }}>
                        <div className='d-flex flex-column gap-3'>

                            <div className='text-center'>
                                <span className='fw-bolder fs-2'>{language.messages.Welcome}</span>
                            </div>

                            <Input
                                label={language.rows.Username}
                                name='username'
                                form={form}
                            />

                            <Password
                                label={language.rows.Password}
                                name='password'
                                form={form}
                                see={mode}
                                handleSee={toggleSwitch}
                            />

                            <div className='mt-3'>
                            <Button
                                className='btn-primary w-100'
                                text={language.messages.LogIn}
                                handleOnClick={form.handleSubmit}
                            />
                            </div>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login