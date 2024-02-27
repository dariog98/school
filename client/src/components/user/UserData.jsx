import { faPen } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInLanguageTimeZone, getUTCDateFromString } from '../../constants/date'
import { ButtonLink } from '../basics'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Routes } from '../../constants/routes'
import { useUserContext } from '../providers/UserProvider'

const UserData = ({ data }) => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>

            <div>
                <h3 className='p-0 m-0'>{`${data.surnames ?? ''} ${data.names ?? ''}`}</h3>
                <small className='text-uppercase text-secondary'>{language.roles[data.role_id]}</small>
            </div>

            <div className='d-flex justify-content-between'>
                <table>
                    <tbody>
                        <tr>
                            <th className='text-uppercase'>DNI</th>
                            <td className='ps-3'>{data.dni}</td>
                        </tr>
                        <tr>
                            <th className='text-uppercase'>Birthdate</th>
                            <td className='ps-3'>{getStringDateInLanguageTimeZone(getUTCDateFromString(data.birthdate), 'EN', 'UTC')}</td>
                        </tr>
                        <tr>
                            <th className='text-uppercase'>Mail</th>
                            <td className='ps-3'>{data.mail}</td>
                        </tr>
                        <tr>
                            <th className='text-uppercase'>Phone</th>
                            <td className='ps-3'>{data.phone}</td>
                        </tr>
                        <tr>
                            <th className='text-uppercase'>Address</th>
                            <td className='ps-3'>{data.address}</td>
                        </tr>
                    </tbody>
                </table>

                {
                    user.idUser === data.id &&
                    <div>
                        <ButtonLink
                            className='btn-secondary'
                            text='Edit'
                            icon={faPen}
                            to={`${Routes.ProfileEdit}`}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default UserData