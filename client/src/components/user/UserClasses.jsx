import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const UserClasses = ({ classes }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            <h3 className='p-0 m-0'>Classes</h3>

            {
                classes.map((userClass, index) =>
                    <Link key={userClass.id} to={`${Routes.Classes}/${userClass.id}`}  className={`card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                        <div className='card-body'>
                        {userClass.description}
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default UserClasses