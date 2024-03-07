import { useSearchParams } from 'react-router-dom'

const useCustomSearchParams = (key) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const getItem = () => {
        return searchParams.get(key)
    }

    const setItem = (value) => {
        if (value === '' || value === undefined) {
            removeItem()
            return
        }
        setSearchParams(params => {
            params.set(key, value)
            return params
        })
    }

    const removeItem = () => {
        setSearchParams(params => {
            params.delete(key)
            return params
        })
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}

export default useCustomSearchParams