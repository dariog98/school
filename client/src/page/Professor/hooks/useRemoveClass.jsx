import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

const useRemoveClass = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentSelected, setCurrentSelected] = useState()

    const handleRemoveClick = (idClassroom) => {
        setCurrentSelected(idClassroom)
        onOpen()
    }

    const handleClose = () => {
        setCurrentSelected(undefined)
        onClose()
    }

    return {
        isOpen,
        handleClose: handleClose,
        handleOpen: handleRemoveClick,
        currentSelected,
        handleCurrentSeleted: setCurrentSelected,
    }
}

export default useRemoveClass