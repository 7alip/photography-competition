import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa'

import logoWhite from '../assets/img/logo-white.svg'

const social = [
  {
    address: 'https://twitter.com/samen4vv',
    icon: <FaTwitter />,
  },
  {
    address: 'https://facebook.com',
    icon: <FaFacebook />,
  },
  {
    address: 'https://instagram.com/samen4vv',
    icon: <FaInstagram />,
  },
  {
    address: 'https://youtube.com',
    icon: <FaYoutube />,
  },
]

const Footer = () => {
  return (
    <Box as='footer' h={24} bg='light.orange'>
      <Container maxW='lg' h='full'>
        <Flex
          flexWrap='wrap'
          textAlign='center'
          h='full'
          align='center'
          justify={['center', 'space-between']}
        >
          <Image h={12} src={logoWhite} />
          <Text textAlign='center' flex={1} fontSize='sm' color='white'>
            Samen4VV &copy; All rights reserved
          </Text>
          <HStack>
            {social.map(({ address, icon }) => (
              <IconButton
                size='sm'
                color='white'
                _hover={{ color: 'light.orange', bg: 'white' }}
                key={address}
                as='a'
                href={address}
                rounded='full'
                variant='ghost'
                icon={icon}
              />
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
