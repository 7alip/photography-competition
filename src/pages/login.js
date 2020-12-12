import React from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SiTwitter, SiFacebook, SiGoogle, SiInstagram } from 'react-icons/si'

const Login = () => {
  const providers = [
    {
      title: 'Google',
      icon: <SiGoogle />,
      colorSchema: 'red',
    },
    {
      title: 'Facebook',
      icon: <SiFacebook />,
      colorSchema: 'facebook',
    },
    {
      title: 'Twitter',
      icon: <SiTwitter />,
      colorSchema: 'twitter',
    },
  ]

  const { t } = useTranslation()

  return (
    <Flex justify='center' flex={1} align='center'>
      <VStack
        maxW={320}
        w='full'
        bg='white'
        boxShadow='md'
        p={6}
        borderRadius='lg'
        spacing={4}
      >
        <Heading textAlign='center' as='h3' size='lg'>
          {t('auth.login')}
        </Heading>
        <Divider />
        <VStack w='full'>
          {providers.map(({ title, icon, colorSchema }) => (
            <Button
              w='full'
              leftIcon={icon}
              colorScheme={colorSchema}
              key={title}
              as='a'
              href={`https://admin.samenvvv.nl/connect/${title.toLowerCase()}`}
            >
              {t('auth.connect_to')} {title}
            </Button>
          ))}
        </VStack>
        <Divider />
        <Alert status='warning'>
          <AlertIcon w='50px' />
          <Text fontSize='sm'>{t('auth.warning')}</Text>
        </Alert>
      </VStack>
    </Flex>
  )
}

export default Login
