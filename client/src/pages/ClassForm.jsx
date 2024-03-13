import { useSettingsContext } from '../components/providers/SettingsProvider'
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonLink, Container, Input, Title } from '../components/basics'
import { useClass, useClassForm } from '../hooks'
import { useParams } from 'react-router-dom'
import Loading from '../components/basics/Loading'
import { Routes } from '../constants/routes'

const Form = ({ idClass, data }) => {
    const { language } = useSettingsContext()
    const { form, isLoading: isLoadingForm } = useClassForm({ idClass, data })

    return (
        <>
            <Input
                form={form}
                label={language.rows.Description}
                type='text'
                name='description'
            />

            <div className='d-flex justify-content-end'>
                <Button
                    className='btn-primary'
                    icon={faFloppyDisk}
                    text={language.buttons.Save}
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
    const { language } = useSettingsContext()
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
                        <Title text={(idClass && data) ? data.data.description : language.titles.NewClass}>
                            <ButtonLink
                                to={(idClass && data) ? `${Routes.Classes}/${idClass}` : Routes.Classes}
                                className='btn-outline-system rounded-5'
                                icon={faArrowLeft}
                                text={language.buttons.GoBack}
                            />
                        </Title>
                       <Form idClass={idClass} data={extractDataForForm(data?.data)}/>
                    </>
                }
            </div>
        </Container>
    )
}

export default ClassForm