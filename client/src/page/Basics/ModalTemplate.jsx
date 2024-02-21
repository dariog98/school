import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Box } from '@chakra-ui/react'

const ModalTemplate = ({ title, children, loading, handleConfirm, handleClose, isOpen }) => {
    return (
        <>
            <Modal onClose={handleClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>

                    <ModalHeader>{title}</ModalHeader>

                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Box display='flex' gap='1rem'>
                            <Button onClick={handleConfirm} colorScheme='green' isDisabled={loading}>{loading ? '' : 'Confirmar'}</Button>
                            <Button onClick={handleClose} colorScheme='red'>Cancelar</Button>
                        </Box>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalTemplate