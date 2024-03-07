import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { Button, SearchBar } from '../basics'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ClassTests = ({ idClass, tests }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            {/*<h5 className='p-0 m-0'>Students</h5>*/}
            <div className='d-flex gap-3'>
                <SearchBar
                    placeholder='Search...'
                />
                <Button
                    className='btn-primary'
                    icon={faPlus}
                    text='Add'
                />
            </div>

            {
                tests.map((test, index) =>
                    <Link key={test.id} to={`${Routes.Classes}/${idClass}/tests/${test.id}`} className={`card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
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