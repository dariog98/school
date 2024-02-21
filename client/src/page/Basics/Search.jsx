import { InputGroup, InputLeftElement, Input, Button, Box } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRef } from 'react'

const Search = ({ handleSearch }) => {
    const searchValue = useRef()

    const handleClick = () => {
        handleSearch(searchValue.current.value)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSearch(searchValue.current.value)
        }
    }

    return (
        <Box flexGrow='1'>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.500'/>
                </InputLeftElement>
                <Input ref={searchValue} onKeyDown={handleKeyDown}type='text' placeholder='Buscar' borderRightRadius='0'/>
                <Button onClick={handleClick} borderTopLeftRadius='0' borderBottomLeftRadius='0'>Buscar</Button>
            </InputGroup>
        </Box>
    )
}

export default Search