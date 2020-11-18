import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { HStack, Container, Image, Text } from '@chakra-ui/react'

import ThemeButton from './theme-button'
import logoAlt from '../assets/img/logo-alt.svg'

import { logout } from '../store/auth/actions'
import LanguageSwitcher from './language-switcher'

const Navbar = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Container
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      py={2}
      maxW='full'
      boxShadow='sm'
      mb={4}
      bg='white'
    >
      <Link to='/'>
        <HStack _hover={{ cursor: 'pointer' }}>
          <Image h={16} src={logoAlt} />
          <Text
            lineHeight='1'
            fontSize='xl'
            textTransform='uppercase'
            fontWeight='600'
            color='light.orange'
            fontFamily='logo'
            d={['none', null, 'block']}
          >
            Samen voor Vrijheid <br />
            en Verbinding
          </Text>
        </HStack>
      </Link>
      <HStack spacing={3}>
        {isLoggedIn ? (
          <ThemeButton onClick={() => dispatch(logout())}>
            {t('auth.logout')}
          </ThemeButton>
        ) : (
          <Link to='/login'>
            <ThemeButton>{t('auth.login')}</ThemeButton>
          </Link>
        )}
        <LanguageSwitcher />
      </HStack>
    </Container>
  )
}

export default Navbar
