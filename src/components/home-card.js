import { Box, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const HomeCard = ({ image, text, to }) => {
  const { t } = useTranslation()

  return (
    <Box
      as={Link}
      w={['full', false, 1 / 2]}
      to={to}
      transition='all 200ms ease-in-out'
      borderWidth={4}
      borderColor='transparent'
      borderRadius='md'
      _hover={{ borderColor: 'light.orange' }}
      cursor='pointer'
    >
      <VStack
        align='center'
        pb={4}
        textAlign='center'
        bg='white'
        boxShadow='md'
      >
        <Image
          as={LazyLoadImage}
          effect='blur'
          loading='lazy'
          src={image}
          w={300}
          objectFit='cover'
        />
        <Heading as='h3' size='md' mb={3}>
          {t(text)}
        </Heading>
      </VStack>
    </Box>
  )
}

export default HomeCard
