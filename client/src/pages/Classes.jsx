import { Link } from 'react-router-dom'
import { ButtonLink, Container, Loading, SearchBar, Title } from '../components/basics'
import { Routes } from '../constants/routes'
import { useClasses, useCustomSearchParams } from '../hooks'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { USER_ROLES } from '../constants/roles'
import { useUserContext } from '../components/providers/UserProvider'

const Classes = () => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()
    const search = useCustomSearchParams('search')
    const { isLoading, data } = useClasses({ search: search.getItem() })

    return (
        <Container title={language.titles.Classes}>
            <div className='d-flex flex-column gap-3'>
                <Title text='Classes'/>

                <div className='d-flex gap-3'>
                    <SearchBar placeholder={language.messages.Search} value={search.getItem()} handleSearch={search.setItem}/>
                    {
                        [USER_ROLES.Admin, USER_ROLES.Professor].includes(user.role.id) &&
                        <ButtonLink
                            to={`${Routes.Classes}/new`}
                            className='btn-primary rounded-5'
                            icon={faPlus}
                            text={language.buttons.Add}
                        />
                    }
                </div>
                {
                    isLoading
                    ? <Loading/>
                    : data?.data.length ?
                        data.data.map((subject, index) =>
                            <Link key={subject.id} className={`card shadow-sm m-0 ${index % 2 ? 'bg-body-secondary' : ''}`} to={`${Routes.Classes}/${subject.id}`}>
                                <div className='card-body'>{subject.description}</div>
                            </Link>
                        )
                        : <div className='card shadow-sm m-0 bg-body-secondary'>
                            <div className='card-body'>
                                {language.messages.NoClasses}
                            </div>
                        </div>
                }
            </div>
        </Container>
    )
}

export default Classes