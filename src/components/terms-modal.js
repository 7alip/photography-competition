import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import ThemeButton from './theme-button'

const TermsModal = ({ isOpen, onClose }) => {
  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Katılım Koşulları</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight='bold' mb='1rem'>
            Gerekli açıklamalar...
          </Text>
        </ModalBody>

        <ModalFooter>
          <ThemeButton onClick={onClose}>Tamam</ThemeButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TermsModal
