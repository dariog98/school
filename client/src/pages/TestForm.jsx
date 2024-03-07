import { faArrowLeft, faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Input } from '../components/basics'
import { useClassStudents, useTest, useTestForm } from '../hooks'
import { useParams } from 'react-router-dom'
import Loading from '../components/basics/Loading'

const getFormData = (data) => {
    const { description, date, students } = data
    const qualifications = students.reduce((acc, student) => {
        acc[student.id] = student.qualification
        return acc
    }, {})
    const formData = { description, date, ...qualifications }
    return formData
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
                {/*<div>
                    <Button
                        className='btn-secondary'
                        text='Add all students'
                    />
                </div>*/}
            </div>

            <div className='d-flex flex-column gap-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <small className='text-secondary'>Student</small>
                    <small className='text-secondary'>Qualification</small>
                </div>
                {
                    students.map(student =>
                        <div key={student.id} className='d-flex align-items-center justify-content-between'>
                            {`${student.surnames} ${student.names}`}

                            <Input
                                form={form}
                                name={String(student.id)}
                                type='number'
                            />
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
    const { id: idClass, test: idTest } = useParams()
    const { data: testData, isLoading: isLoadingdTestData } = useTest({ idClass, idTest })
    
    return (
        <Container>
            {
                isLoadingdTestData
                ? <Loading/>
                : testData?.data ?
                    <div>
                        <h3 className='p-0 m-0'>Test</h3>
                        <Form idClass={idClass} idTest={idTest} data={getFormData(testData.data)} students={testData.data.students}/>
                    </div>
                    :
                    <></>
            }
        </Container>
    )
}

export default Test