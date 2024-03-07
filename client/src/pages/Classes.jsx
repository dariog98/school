import { Link } from 'react-router-dom'
import { Button, ButtonLink, Container, NotFound, SearchBar } from '../components/basics'
import { Routes } from '../constants/routes'
import { useClasses, useCustomSearchParams } from '../hooks'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Classes = () => {
    const search = useCustomSearchParams('search')
    const { isLoading, data } = useClasses({ search: search.getItem() })

    return (
        <Container title='Classes'>
            <div className='d-flex flex-column gap-3'>
                <div className='d-flex gap-3'>
                    <SearchBar placeholder='Search...' value={search.getItem()} handleSearch={search.setItem}/>
                    <ButtonLink
                        to={`${Routes.Classes}/new`}
                        className='btn-primary'
                        icon={faPlus}
                        text='Add'
                    />
                </div>
                {
                    !isLoading && data
                    ? data.data.map((subject, index) =>
                        <Link key={subject.id} className={`card shadow-sm m-0 ${index % 2 ? 'bg-body-secondary' : ''}`} to={`${Routes.Classes}/${subject.id}`}>
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