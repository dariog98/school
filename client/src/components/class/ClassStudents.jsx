import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const ClassStudents = ({ students }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            <h5 className='p-0 m-0'>Students</h5>

            {
                students.map(student =>
                    <Link key={student.id} to={`${Routes.Users}/${student.id}`} className='card shadow-sm'>
                        <div className='card-body'>
                            {`${student.surnames} ${student.names}`}
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default ClassStudents