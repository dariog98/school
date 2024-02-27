import { Link } from 'react-router-dom'
import { Container, NotFound, SearchBar } from '../components/basics'
import { Routes } from '../constants/routes'
import { useClasses } from '../hooks'

const Classes = () => {
    const { isLoading, data } = useClasses()

    return (
        <Container title='Classes'>
            <div className='d-flex flex-column gap-3'>
                <div>
                    <SearchBar placeholder='Search...'/>
                </div>
                {
                    !isLoading && data
                    ? data.data.map(subject =>
                        <Link key={subject.id} className='card shadow-sm m-0' to={`${Routes.Classes}/${subject.id}`}>
                            <div className='card-body'>{subject.description}</div>
                        </Link>
                    )
                    : <NotFound/>
                }
            </div>
        </Container>
    )
}

export default Classes