import React, { useEffect } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  toast,
  useDisclosure,
} from '@chakra-ui/react'
import GoogleAnalytics from 'react-ga'

import Footer from './footer'
import Navbar from './navbar'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ThemeButton from './theme-button'

const Layout = ({ children }) => {
  const [cookieAccepted, setCookieAccepted] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  const acceptCookie = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookieAccepted', JSON.stringify(true))
    onClose()
  }

  useEffect(() => {
    GoogleAnalytics.initialize('UA-185698689-1')
    const accepted = localStorage.getItem('cookieAccepted')

    if (accepted === 'true') setCookieAccepted(true)
    else onOpen()

    GoogleAnalytics.pageview(window.location.pathname + window.location.search)
  }, [onOpen])
  return (
    <Flex overflowX='hidden' minH='100vh' flexDir='column' bg='gray.100'>
      <Navbar />
      <Flex flexDir='column' flex={1} mt='80px' pt='50px' mb={8}>
        {children}
      </Flex>
      <Footer />
      <Drawer
        onClose={onClose}
        isOpen={!cookieAccepted && isOpen}
        placement='bottom'
        size='xl'
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <DrawerOverlay>
          <DrawerContent bg='light.orange' color='white'>
            <DrawerHeader>{t('cookie.title')}</DrawerHeader>
            <DrawerBody>
              <Flex justify='space-between'>
                <Text>{t('cookie.description')}</Text>
                <ThemeButton
                  _hover={{
                    borderColor: 'white',
                    bg: 'light.orange',
                    color: 'white',
                  }}
                  isReversed
                  onClick={acceptCookie}
                >
                  {t('cookie.button')}
                </ThemeButton>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  )
}

export default Layout
