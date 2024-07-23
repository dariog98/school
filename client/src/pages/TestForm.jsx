import { faArrowLeft, faFloppyDisk, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonLink, Container, Input, Title, Loading } from '../components/basics'
import { useClassStudents, useModal, useTest, useTestForm } from '../hooks'
import { useParams } from 'react-router-dom'
import { Routes } from '../constants/routes'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import ParticipantsModal from '../components/tests/ParticipantsModal'
import { useUserContext } from '../components/providers/UserProvider'
import { USER_ROLES } from '../constants/roles'

const getFormData = (data) => {
    if (data) {
        const { description, date, students } = data
        const qualifications = students.reduce((acc, student) => {
            acc[student.id] = { qualification: student.qualification, enabled: student.isEnabled ?? false }
            return acc
        }, {})
        const formData = { description, date, students: qualifications }
        return formData
    }
    return {}
}

const Form = ({ idClass, idTest, data, students }) => {
    const { language } = useSettingsContext()
    const { form, isLoading } = useTestForm({ idClass, idTest, data })
    const { show, handleClose, handleOpen } = useModal()

    return (
        <div className='d-flex flex-column gap-3'>
            <Input
                form={form}
                label='Description'
                type='text'
                name='description'
            />

            <Input
                form={form}
                label='Date'
                type='date'
                name='date'
            />

            <div className='d-flex align-items-center justify-content-between'>
                <div>Participants</div>

                <Button
                    className='btn-primary rounded-5'
                    icon={faUserPlus}
                    text={language.buttons.Add}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    handleOnClick={handleOpen}
                />
            </div>

            <div className='d-flex flex-column gap-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <small className='text-secondary'>Student</small>
                    <small className='text-secondary'>Qualification</small>
                </div>
                {
                    students.filter(student => form.getValues(`students.${String(student.id)}.enabled`)).map((student, index) =>
                        <div key={student.id} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                            <div className='py-2 px-3'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    {`${student.surnames} ${student.names}`}

                                    <div style={{ maxWidth: '4rem' }}>
                                        <Input
                                            form={form}
                                            name={`students.${String(student.id)}.qualification`}
                                            type='number'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <ParticipantsModal show={show} handleClose={handleClose} form={form} students={students}/>
            
            <div className='d-flex justify-content-end gap-3'>
                <Button
                    className='btn-success rounded-5'
                    icon={faFloppyDisk}
                    text={language.buttons.Save}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    handleOnClick={form.handleSubmit}
                />
            </div>

        </div>
    )
}

const TestData = ({ data }) => {
    const { user } = useUserContext()
    const student = data.students.find(student => student.id === user.idUser)

    return (
        <div className='d-flex flex-column gap-3'>
            <Input
                label='Description'
                type='text'
                name='description'
                value={data.description}
                isReadOnly={true}
            />

            <Input
                label='Date'
                type='date'
                name='date'
                value={data.date}
                isReadOnly={true}
            />

            <div className='d-flex flex-column gap-2'>
                <div>Qualification</div>
                <div className='flex-grow-1 card shadow-sm bg-body-secondary'>
                    <div className='py-2 px-3'>
                        <div className='d-flex align-items-center justify-content-between'>
                            {`${student.surnames} ${student.names}`}

                            <div style={{ maxWidth: '4rem' }}>
                                <Input
                                    name={`students.${String(student.id)}.qualification`}
                                    type='number'
                                    value={student.qualification}
                                    isReadOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Test = () => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()
    const { id: idClass, test: idTest } = useParams()
    const { data: testData, isLoading: isLoadingTestData } = useTest({ idClass, idTest })
    const { data: studentsData } = useClassStudents({ idClass })

    return (
        <Container>
            {
                isLoadingTestData
                ? <Loading/>
                :
                <div>
                    <Title text='Test'>
                        <ButtonLink
                            to={`${Routes.Classes}/${idClass}?tab=tests`}
                            className='btn-outline-system rounded-5'
                            icon={faArrowLeft}
                            text={language.buttons.GoBack}
                        />
                    </Title>
                    {
                        [USER_ROLES.Admin, USER_ROLES.Professor].includes(user.role.id)
                        ? <Form idClass={idClass} idTest={idTest} data={getFormData(testData?.data)} students={studentsData?.data ?? []}/>
                        : testData && <TestData data={testData?.data}/>
                    }
                </div>
            }
        </Container>
    )
}

export default Test