import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SiTwitter, SiFacebook, SiGoogle } from 'react-icons/si'
import AuthForm from '../components/auth-form'

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

const Login = () => {
  const { t } = useTranslation()
  const [isRegistering, setIsRegistering] = useState(false)

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
          {isRegistering ? t('auth.register') : t('auth.login')}
        </Heading>
        <Divider />

        <AuthForm isRegistering={isRegistering} />
        <Link onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? t('auth.login_link') : t('auth.register_link')}
        </Link>

        <Divider />
        <VStack w='full'>
          {providers.map(({ title, icon, colorSchema }) => (
            <Button
              w='full'
              leftIcon={icon}
              colorScheme={colorSchema}
              key={title}
              as='a'
              href={`${
                process.env.REACT_APP_BACKEND_URL
              }/connect/${title.toLowerCase()}`}
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
