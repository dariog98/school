import { getStringDateInLanguageTimeZone, getUTCDateFromString } from '../../constants/date'
import { useSettingsContext } from '../providers/SettingsProvider'

const UserData = ({ data }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>

            <div>
                <h3 className='p-0 m-0'>{`${data.surnames ?? ''} ${data.names ?? ''}`}</h3>
                <small className='text-uppercase text-secondary'>{language.roles[data.role_id]}</small>
            </div>

            <div>
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
            </div>
        </div>
    )
}

export default UserData