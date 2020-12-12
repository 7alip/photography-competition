import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <Flex flex={1} w='full' justify='center' align='center'>
      <Spinner thickness={8} size='xl' speed='0.5s' color='light.orange' />
    </Flex>
  )
}

export default Loader
