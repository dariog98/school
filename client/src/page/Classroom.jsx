import { useParams } from 'react-router-dom'
import useClassroom from './Classroom/hooks/useClassroom'
import { faSchool, faChalkboardTeacher, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Box, Button } from '@chakra-ui/react'
import { ROUTES } from '../constants/Routes'
import ItemBox from './Basics/ItemBox'
import Form from './Basics/Form'
import Subtitle from './Basics/Subtitle'
import RemovableItem from './Basics/RemovableItem'
import DeleteProfessor from './Professor/DeleteProfessor'
import useClasstimes from './Classroom/hooks/useClasstimes'
import { useState } from 'react'
import { required } from '../constants/formErrors'

const Classroom = () => {
    const params = useParams()
    const { loading, classroom, editClassroom, deleteClassroom } = useClassroom(params.id)
    const { classtimes } = useClasstimes()
    const [isEditMode, setEditMode] = useState()

    const inputs = [
        { name: 'description', label: 'Descripción', type: 'text', validations: { required } },
        { name: 'classtime', label: 'Turno', type: 'select', validations: { required }, options: classtimes.map(classtime => { return { description: classtime.description, value: classtime.id}}) },
    ]

    return (
        <Box display='flex' flexDirection='column' gap='1rem'>
            {
                classroom
                ? <>
                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Subtitle icon={faSchool} title='Datos de la clase'>
                            <Button display={isEditMode ? 'none' : 'inherit'} colorScheme='teal' onClick={() => setEditMode(true)}>Editar</Button>
                        </Subtitle>

                        <Form
                            defaultValues={{ description: classroom.description, classtime: classroom.classtime.id }}
                            inputs={inputs}
                            handleAction={editClassroom}
                            isEditMode={isEditMode}
                            handleCloseEditMode={() => setEditMode(false)}
                        />
                    </Box>

                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Subtitle icon={faChalkboardTeacher} title='Profesor'/>
                        <Box display='flex' flexDirection='column' gap='1rem'>
                            {
                                classroom.professor
                                ? <RemovableItem
                                    title={`${classroom.professor.surnames} ${classroom.professor.names}`}
                                    route={`${ROUTES.Professors}/${classroom.professor.id}`}
                                    handleRemove={null}
                                />  
                                : <ItemBox title='Profesor no asignado'/>
                            }
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Subtitle icon={faUsers} title='Alumnos'/>
                        <Box display='flex' flexDirection='column' gap='1rem'>
                            {
                                classroom.students.map(student =>
                                    <RemovableItem
                                        key={student.id}
                                        title={`${student.surnames} ${student.names}`}
                                        route={`${ROUTES.Students}/${student.id}`}
                                        handleRemove={null}
                                    />  
                                )
                            }
                        </Box>
                    </Box>

                    <DeleteProfessor handleDelete={deleteClassroom}/>
                </>
                : <>
                </>
            }
        </Box>
    )
}

export default Classroom