import { useEffect, useState } from 'react'
import { getUTCDateFromString } from '../constants/date'

const useDate = (initialDate) => {
    const [date, setDate] = useState(initialDate ? getUTCDateFromString(initialDate) : new Date())

    useEffect(() => {
        setDate(initialDate ? getUTCDate(initialDate) : new Date())
    }, [initialDate])

    const goToDate = (date) => {
        setDate(date)
    }

    const goToPrevDate = () => {
        const prevDate = new Date(date.getTime())
        prevDate.setUTCDate(prevDate.getUTCDate() - 1)
        setDate(prevDate)
    }

    const goToNextDate = () => {
        const nextDate = new Date(date.getTime())
        nextDate.setUTCDate(nextDate.getUTCDate() + 1)
        setDate(nextDate)
    }

    const goToPrevMonth = () => {
        const prevMonth = new Date(date.getTime())
        prevMonth.setUTCMonth(prevMonth.getUTCMonth() - 1)
        setDate(prevMonth)
    }

    const goToNextMonth = () => {
        const nextMonth = new Date(date.getTime())
        nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1)
        setDate(nextMonth)
    }

    return { date, goToDate, goToPrevDate, goToNextDate, goToPrevMonth, goToNextMonth }
}

export default useDate