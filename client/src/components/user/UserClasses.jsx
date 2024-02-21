import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const UserClasses = ({ classes }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            <h3 className='p-0 m-0'>Classes</h3>

            <div>
            {
                classes.map(userClass =>
                    <Link key={userClass.id} to={`${Routes.Classes}/${userClass.id}`} className='card bg-body-secondary'>
                        <div className='card-body'>
                        {userClass.description}
                        </div>
                    </Link>
                )
            }
            </div>
        </div>
    )
}

export default UserClasses