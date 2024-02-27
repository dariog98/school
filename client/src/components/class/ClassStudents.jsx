import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { Button } from '../basics'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ClassStudents = ({ students }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            {/*<h5 className='p-0 m-0'>Students</h5>*/}

            {
                students.map((student, index) =>
                <div className='d-flex gap-2'>
                    <Link key={student.id} to={`${Routes.Users}/${student.id}`} className={`flex-grow-1 card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                        <div className='card-body py-2'>
                            {`${student.surnames} ${student.names}`}
                        </div>
                    </Link>

                    <Button
                        className='btn-outline-system'
                        icon={faTrash}
                    />
                </div>
                )
            }
        </div>
    )
}

export default ClassStudents