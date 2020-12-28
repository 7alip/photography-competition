import React from 'react'
import { Heading, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ThemeButton from '../components/theme-button'
import { useTranslation } from 'react-i18next'
import confirmed from '../assets/img/confirmed.svg'

const Confirmed = () => {
  const { t } = useTranslation()
  return (
    <VStack flex={1} h='full' w='full' align='center' justify='center'>
      <Image src={confirmed} w='100%' maxW='500px' />
      <Heading>{t('email_confirmed')}</Heading>
      <ThemeButton as={Link} to='/login'>
        {t('auth.login')}
      </ThemeButton>
    </VStack>
  )
}

export default Confirmed
