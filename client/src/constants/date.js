const getStringDateInLanguageTimeZone = (date, language, timeZone) => {
    return date.toLocaleString(
        language, 
        { 
            year: 'numeric',
            month: 'long',
            day:'numeric',
            timeZone: timeZone
        }
    )
}

const getStringDateInTimeZone = (date, timeZone) => {
    const [ month, day, year ] = date.toLocaleString('en-EN', { year: 'numeric', month: '2-digit', day:'2-digit', timeZone: timeZone }).split('/')
    return `${year}-${month}-${day}`
}

const getUTCDateFromString = (string) => {
    const [year, month, day] = String(string).split('-')
    return new Date(Date.UTC(year, (month - 1), day, 0, 0, 0))
}

const getWeeksInMonth = (year, month) => {
    const weeks = []
    const firstDate = new Date(Date.UTC(year, month, 1))
    const lastDate  = new Date(Date.UTC(year, month + 1, 0))

    const weeksCount = Math.ceil((firstDate.getUTCDay() + lastDate.getUTCDate()) / 7)

    if (firstDate.getUTCDay() !== 0) {
        firstDate.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay())
    }

    if (lastDate.getUTCDay() !== 6) {
        lastDate.setUTCDate(lastDate.getUTCDate() + (6 - lastDate.getUTCDay()))
    }

    const date = firstDate

    for (let week = 0; week < weeksCount; week++) {
        const weeksDays = []
        for (let day = 0; day < 7; day++) {
            weeksDays.push(new Date(date))
            date.setUTCDate(date.getUTCDate() + 1)
        }
        weeks.push(weeksDays)
    }

    return weeks
}

const isTheSameDate = (dateOne, dateTwo) => {
    return (
        dateOne.getUTCFullYear() === dateTwo.getUTCFullYear() &&
        dateOne.getUTCMonth() === dateTwo.getUTCMonth() &&
        dateOne.getUTCDate() === dateTwo.getUTCDate()
    )
}

export { getStringDateInLanguageTimeZone, getStringDateInTimeZone, getUTCDateFromString, getWeeksInMonth, isTheSameDate }