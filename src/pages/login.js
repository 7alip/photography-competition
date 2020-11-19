import React from 'react'
import { Button, Divider, Flex, Heading, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SiTwitter, SiFacebook, SiGoogle, SiInstagram } from 'react-icons/si'

const backendUrl = process.env.REACT_APP_BACKEND_URL

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
    {
      title: 'Instagram',
      icon: <SiInstagram />,
      colorSchema: 'pink',
    },
  ]

  const { t } = useTranslation()

  return (
    <Flex justify='center' flex={1} align='center'>
      <VStack
        maxW={300}
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
              href={`${backendUrl}/connect/${title.toLowerCase()}`}
            >
              {t('auth.connect_to')} {title}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Flex>
  )
}

export default Login
