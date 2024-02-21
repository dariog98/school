const useLocalStorage = (key) => {
    
    const setItem = (value) => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    const getItem = () => {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
    }

    const removeItem = () => {
        window.localStorage.removeItem(key)
    }

    return {
        setItem,
        getItem,
        removeItem
    }
}

export default useLocalStorage