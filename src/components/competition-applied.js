import { Box, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import ThemeButton from './theme-button'

const CompetitionApplication = ({ appliedPhoto }) => {
  return (
    <VStack justify='center' flex={1} spacing={3} align='center'>
      <Heading textAlign='center' as='h3' size='sm'>
        Daha önce yapılmış bir başvurunuz bulunmaktadır.
      </Heading>
      <Box my={4}>
        <Image src={appliedPhoto.image.formats?.thumbnail?.url} />
      </Box>
      <HStack spacing={3}>
        <Link to='/'>
          <a>
            <ThemeButton>Anasayfa</ThemeButton>
          </a>
        </Link>
        <Link to='/voting'>
          <a>
            <ThemeButton>Oy Kullanın</ThemeButton>
          </a>
        </Link>
      </HStack>
    </VStack>
  )
}

export default CompetitionApplication
