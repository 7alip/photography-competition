import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const MarkdownModal = ({ isOpen, onToggle, content, ...rest }) => {
  return (
    <Modal
      isCentered={true}
      scrollBehavior='inside'
      isOpen={isOpen}
      onClose={onToggle}
      motionPreset='slideInBottom'
      size='xl'
      {...rest}
    >
      <ModalOverlay />
      <ModalContent overflowY='auto' mx={2}>
        <ModalBody>
          <ModalCloseButton />
          <ReactMarkdown
            allowDangerousHtml
            renderers={{
              paragraph: ({ children }) => <Text mb={4}>{children}</Text>,
              heading: ({ children }) => {
                console.log('children', children)
                return (
                  <Heading fontSize='24px' mt={8} mb={2}>
                    {children}
                  </Heading>
                )
              },
            }}
            children={content}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MarkdownModal
