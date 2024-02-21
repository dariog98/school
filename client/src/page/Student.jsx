import { ROUTES } from '../constants/Routes'
import { useParams } from 'react-router-dom'
import { faSchool, faUser } from '@fortawesome/free-solid-svg-icons'
import { Box, Button} from '@chakra-ui/react'
import Subtitle from './Basics/Subtitle'
import Form from './Basics/Form'
import ItemBox from './Basics/ItemBox'
import AddClass from './Professor/AddClass'
import RemoveClass from './Professor/RemoveClass'
import RemovableItem from './Basics/RemovableItem'
import DeleteProfessor from './Professor/DeleteProfessor'
import useStudent from './Student/hooks/useStudent'
import useRemoveClass from './Professor/hooks/useRemoveClass'
import { useState } from 'react'
import { required } from '../constants/formErrors'

const Student = () => {
    const params = useParams()
    const { loading, student, editStudent, deleteStudent, addClassroom, removeClassroom } = useStudent(params.id)
    const { isOpen, handleOpen, handleClose, currentSelected } = useRemoveClass()
    const [isEditMode, setEditMode] = useState()

    const inputs = [
        { name: 'surnames', label: 'Apellidos', type: 'text', validations: { required } },
        { name: 'names', label: 'Nombres', type: 'text', validations: { required } },
        { name: 'dni', label: 'DNI', type: 'number', validations: { required } },
        { name: 'birthdate', label: 'Fecha de Nacimiento', type: 'date', validations: { required } },
        { name: 'phone', label: 'Teléfono', type: 'text' },
        { name: 'address', label: 'Dirección', type: 'text' },
    ]

    return (
        <Box display='flex' flexDirection='column' gap='1rem'>
            {
                student
                ? <>
                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Subtitle icon={faUser} title='Datos del alumno'>
                            <Button display={isEditMode ? 'none' : 'inherit'} colorScheme='teal' onClick={() => setEditMode(true)}>Editar</Button>
                        </Subtitle>
                        <Form defaultValues={student} inputs={inputs} handleAction={editStudent} isEditMode={isEditMode} handleCloseEditMode={() => setEditMode(false)}/>
                    </Box>

                    <RemoveClass handleSubmit={removeClassroom} handleClose={handleClose} idClassroom={currentSelected} isOpen={isOpen}/>

                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Subtitle icon={faSchool} title='Clases'><AddClass handleSubmit={addClassroom}/></Subtitle>
                        <Box display='flex' flexDirection='column' gap='1rem'>
                            {
                                student.classrooms.length
                                ? student.classrooms.map(classroom =>
                                    <RemovableItem
                                        key={classroom.id}
                                        title={classroom.description}
                                        route={`${ROUTES.Classrooms}/${classroom.id}`}
                                        handleRemove={() => handleOpen(classroom.id)}
                                    />
                                )
                                : <ItemBox title='No se ha inscrito a ninguna clase'/>
                            }
                        </Box>
                    </Box>

                    <DeleteProfessor handleDelete={deleteStudent}/>
                </>
                : <>
                </>
            }
        </Box>
    )
}

export default Student