import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { LANGUAGES } from '../../constants/languages'

const settingsContext = createContext()

const SettingsProvider = ({ children }) => {
    const themeStorage = useLocalStorage('THEME')
    const languageStorage = useLocalStorage('LANGUAGE')

    const [theme, setTheme] = useState(themeStorage.getItem() || 'dark')
    const [language, setLanguage] = useState(languageStorage.getItem() || 'EN')

    document.body.setAttribute('data-bs-theme', theme)
    const isThemeDark = theme === 'dark'

    const toggleTheme = () => {
        setTheme(isThemeDark ? 'light' : 'dark')
        themeStorage.setItem(isThemeDark ? 'light' : 'dark')
    }

    const handleLanguage = (value) => {
        setLanguage(value)
        languageStorage.setItem(value)
    }

    const config = {
        currentLanguage: language,
        language: LANGUAGES[language],
        handleLanguage,
        theme,
        toggleTheme,
        isThemeDark,
    }

    return (
        <settingsContext.Provider value={config}>
            {children}
        </settingsContext.Provider>
    )
}

const useSettingsContext = () => {
    return useContext(settingsContext)
}

export { SettingsProvider, useSettingsContext }