import { Box, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Text } from "@chakra-ui/react"

const CustomInput = ({ before, after, formManager, type, name, placeholder, options, validations, isReadOnly }) => {
    return (
        <Box display='flex' flexDirection='column' gap='0.5rem'>
            <InputGroup variant={isReadOnly ? 'filled' : 'outline'}>
                {
                    before && <InputLeftAddon children={before}/>
                }
                {
                    type === 'select'
                    ? <Select borderLeftRadius={before && '0'} borderRightRadius={after && '0'} {...formManager.register(name, validations)}>
                        {
                            options.map((option, index) =>
                                <option key={index} value={option.value}>{option.description}</option>
                            )
                        }
                    </Select>
                    : <Input type={type} placeholder={placeholder} {...formManager.register(name, validations)} isReadOnly={isReadOnly}/> 
                }
                {
                    after && <InputRightAddon children={after}/>
                }
            </InputGroup>

            <Box w='100%' display={formManager.errors?.[name] ? 'inherit' : 'none'} fontSize='0.75rem'>
                <Text color='red'>{formManager.errors?.[name]?.message}</Text>
            </Box>
        </Box>
    )
}

export default CustomInput