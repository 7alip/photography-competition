import { Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Flex overflowX='hidden' minH='100vh' flexDir='column' bg='gray.50'>
      <Navbar />
      <Flex flexDir='column' flex={1} my={8}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}

export default Layout
