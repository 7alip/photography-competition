import { Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Flex overflowX='hidden' minH='100vh' flexDir='column' bg='gray.100'>
      <Navbar />
      <Flex flexDir='column' flex={1} mt='80px' pt='50px' mb={8}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}

export default Layout
