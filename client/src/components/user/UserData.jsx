import { faPen, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInLanguageTimeZone, getUTCDateFromString } from '../../constants/date'
import { Button, ButtonLink } from '../basics'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Routes } from '../../constants/routes'
import { useUserContext } from '../providers/UserProvider'

const UserData = ({ data }) => {
    const { user } = useUserContext()
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-row justify-content-between gap-3'>

            <div className='d-flex flex-column gap-3'>
               
                <div className='d-flex justify-content-between'>
                    <table>
                        <tbody>
                            <tr>
                                <th className='text-uppercase'>Username</th>
                                <td className='ps-3'>{data.username}</td>
                            </tr>
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

            <div className='d-flex flex-column gap-2'>
                {
                    user.idUser === data.id &&
                    <>
                        <ButtonLink
                            className='btn-outline-secondary rounded-5'
                            text={language.buttons.Edit}
                            icon={faPen}
                            to={`${Routes.ProfileEdit}`}
                        />

                        <Button
                            className='btn-outline-danger rounded-5'
                            text={language.messages.LogOut}
                            icon={faPowerOff}
                            //to={`${Routes.LogOut}`}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default UserData