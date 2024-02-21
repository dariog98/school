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

export { getStringDateInLanguageTimeZone, getStringDateInTimeZone, getUTCDateFromString }