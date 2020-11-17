import { Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Flex overflowX='hidden' minH='100vh' flexDir='column' bg='gray.50'>
      <Navbar />
      {children}
    </Flex>
  )
}

export default Layout
