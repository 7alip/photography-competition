import { Box, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import ThemeButton from './theme-button'

const HasApplied = ({ appliedPhoto }) => {
  return (
    <VStack justify='center' flex={1} spacing={3} align='center'>
      <Heading textAlign='center' as='h3' size='sm'>
        Daha önce yapılmış bir başvurunuz bulunmaktadır.
      </Heading>
      <Box my={4}>
        <Image src={appliedPhoto} />
      </Box>
      <HStack spacing={3}>
        <Link to='/'>
          <ThemeButton>Anasayfa</ThemeButton>
        </Link>
        <Link to='/voting'>
          <ThemeButton>Oy Kullanın</ThemeButton>
        </Link>
      </HStack>
    </VStack>
  )
}

export default HasApplied
