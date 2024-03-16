import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Input, Password, Navbar, SkoolLogo } from '../components/basics'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useRegister, useSwitch } from '../hooks'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const { language } = useSettingsContext()
    const { isLoading, form } = useRegister()
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

                            <div className='d-flex gap-3 align-items-center justify-content-center'>
                                <FontAwesomeIcon icon={faGraduationCap} size='2x'/>
                                <span className='fw-bolder fs-3'>{language.messages.WelcomeStudent}</span>
                            </div>

                            <Input
                                label={language.rows.Surnames}
                                name='surnames'
                                form={form}
                            />

                            <Input
                                label={language.rows.Names}
                                name='names'
                                form={form}
                            />

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

                            <Password
                                label={language.rows.ConfirmPassword}
                                name='confirmPassword'
                                form={form}
                                see={mode}
                                handleSee={toggleSwitch}
                            />

                            <div className='mt-3'>
                            <Button
                                className='btn-primary w-100'
                                text={language.messages.Register}
                                handleOnClick={form.handleSubmit}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            />
                            </div>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Register