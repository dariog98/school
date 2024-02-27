import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const ClassTests = ({ tests }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            {/*<h5 className='p-0 m-0'>Students</h5>*/}

            {
                tests.map((test, index) =>
                    <Link key={test.id} className={`card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                        <div className='card-body'>
                            {test.description}
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default ClassTests