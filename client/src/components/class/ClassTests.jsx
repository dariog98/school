import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import { ButtonLink, Loading, SearchBar } from '../basics'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useClassTests } from '../../hooks'
import { useState } from 'react'
import { useSettingsContext } from '../providers/SettingsProvider'

const ClassTests = ({ idClass }) => {
    const { language } = useSettingsContext()
    const [search, setSearch] = useState('')
    const { isLoading, data, refreshData } = useClassTests({ idClass, search })

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex gap-3'>
                <SearchBar
                    placeholder={language.messages.Search}
                    handleSearch={setSearch}
                />
                <ButtonLink
                    to={`${Routes.Classes}/${idClass}/tests/new`}
                    className='btn-primary'
                    icon={faPlus}
                    text={language.buttons.Add}
                />
            </div>

            {
                isLoading
                ? <Loading/>
                : data?.data.length
                    ? data.data.map((test, index) =>
                        <Link key={test.id} to={`${Routes.Classes}/${idClass}/tests/${test.id}`} className={`card shadow-sm ${index % 2 ? 'bg-body-secondary' : ''}`}>
                            <div className='card-body'>
                                {test.description}
                            </div>
                        </Link>
                    )
                    :
                    <div className='card shadow-sm bg-body-secondary'>
                        <div className='card-body'>
                            {language.messages.NoTestsClass}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ClassTests