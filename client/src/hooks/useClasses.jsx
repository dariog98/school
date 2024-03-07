import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import { SubjectServices } from '../services'

const useSubjects = ({ search } = {}) => {
    console.log({search})
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getSubjects = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return SubjectServices.getAllSubjects({ search, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getSubjects, [search, page, order])

    return {
        isLoading,
        data,
        order,
        handleOrder,
        handlePage: setPage
    }
}

export default useSubjects