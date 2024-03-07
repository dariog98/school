import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Input } from '../components/basics'
import { useClass, useClassForm } from '../hooks'
import { useParams } from 'react-router-dom'
import Loading from '../components/basics/Loading'

const Form = ({ idClass, data }) => {
    const { form, isLoading: isLoadingForm } = useClassForm({ idClass, data })

    return (
        <>
            <Input
                form={form}
                label='Description'
                type='text'
                name='description'
            />

            <div className='d-flex justify-content-end'>
                <Button
                    className='btn-primary'
                    icon={faFloppyDisk}
                    text='Save'
                    handleOnClick={form.handleSubmit}
                    isLoading={isLoadingForm}
                    isDisabled={isLoadingForm}
                />
            </div>
        </>
    )
}

const extractDataForForm = (data) => {
    if (data) {
        const { description } = data

        return {
            description
        }
    } 
}

const ClassForm = () => {
    const { id: idClass} = useParams()
    const { data, isLoading: isLoadingData } = useClass({ idClass })

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                {
                    isLoadingData ?
                    <Loading/>
                    : 
                    <>
                        {
                            (idClass && data)
                            ? <div className='fs-4'>{data.data.description}</div>
                            : <div className='fs-4'>New class</div>
                        }
                       <Form idClass={idClass} data={extractDataForForm(data?.data)}/>
                    </>
                }
            </div>
        </Container>
    )
}

export default ClassForm