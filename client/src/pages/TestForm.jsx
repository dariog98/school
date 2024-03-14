import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonLink, Container, Input, Title } from '../components/basics'
import { useClassStudents, useTest, useTestForm } from '../hooks'
import { useParams } from 'react-router-dom'
import Loading from '../components/basics/Loading'
import { Routes } from '../constants/routes'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const getFormData = (data) => {
    if (data) {
        const { description, date, students } = data
        const qualifications = students.reduce((acc, student) => {
            acc[student.id] = student.qualification
            return acc
        }, {})
        const formData = { description, date, students: qualifications }
        return formData
    }
    return {}
}

const Form = ({ idClass, idTest, data, students }) => {
    const { form, isLoading } = useTestForm({ idClass, idTest, data })
    const { data: studentsData } = useClassStudents({ idClass })

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
            </div>

            <div className='d-flex flex-column gap-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <small className='text-secondary'>Student</small>
                    <small className='text-secondary'>Qualification</small>
                </div>
                {
                    students.map((student, index) =>
                        <div key={student.id} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                            <div className='py-2 px-3'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    {`${student.surnames} ${student.names}`}

                                    <div style={{ maxWidth: '4rem' }}>
                                        <Input
                                            form={form}
                                            name={`students.${String(student.id)}`}
                                            type='number'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/*
            <div className='d-grid gap-3' style={{ gridTemplateColumns: '2fr 1fr 2fr'}}>
                <div className='card'>
                    <div className='card-body d-flex flex-column gap-3'>
                        {
                            studentsData?.data &&
                            studentsData.data.map(student =>
                            <div className='card'>
                                <div className='card-body'>
                                    {`${student.surnames} ${student.names}`}
                                </div>
                            </div>
                            )
                        }

                    </div>
                </div>

                <div className='d-flex flex-column gap-3 justify-content-center'>
                    <Button
                        className='btn-outline-secondary'
                        icon={faArrowLeft}
                    />
                    <Button
                        className='btn-outline-secondary'
                        icon={faArrowRight}
                    />
                </div>

                <div className='card'>
                    <div className='card-body'></div>
                </div>
            </div>
            */}
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
    )
}

const Test = () => {
    const { language } = useSettingsContext()
    const { id: idClass, test: idTest } = useParams()
    const { data: testData, isLoading: isLoadingTestData } = useTest({ idClass, idTest })
    
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
                    <Form idClass={idClass} idTest={idTest} data={getFormData(testData?.data)} students={testData?.data?.students ?? []}/>
                </div>
            }
        </Container>
    )
}

export default Test