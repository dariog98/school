import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Input } from '../components/basics'
import { useUserForm } from '../hooks'

const EditProfile = () => {
    const { isLoading, form } = useUserForm()

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                <Input
                    form={form}
                    label='Surnames'
                    type='text'
                    name='surnames'
                />

                <Input
                    form={form}
                    label='Names'
                    type='text'
                    name='names'
                />

                <Input
                    form={form}
                    label='DNI'
                    type='number'
                    name='dni'
                />

                <Input
                    form={form}
                    label='Birthdate'
                    type='date'
                    name='birthdate'
                />

                <Input
                    form={form}
                    label='Phone'
                    type='number'
                    name='phone'
                />

                <Input
                    form={form}
                    label='Address'
                    type='text'
                    name='address'
                />

                <div className='d-flex justify-content-end gap-3'>
                    <Button
                        className='btn-success'
                        icon={faFloppyDisk}
                        text='Save'
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        handleOnClick={form.handleSubmit}
                    />
                </div>
            </div>
        </Container>
    )
}

export default EditProfile