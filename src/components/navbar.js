import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  HStack,
  Container,
  Image,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import ThemeButton from './theme-button'

import { logoutUser } from '../store/auth/actions'
import logoAlt from '../assets/img/logo-alt.svg'
import tr from '../assets/img/tr.svg'
import en from '../assets/img/en.svg'
import nl from '../assets/img/nl.svg'
import { setLocale } from '../store/locale/actions'
import MarkdownModal from './markdown-modal'
import terms_en from '../content/terms-en.md'
import terms_nl from '../content/terms-nl.md'
import terms_tr from '../content/terms-tr.md'

const Navbar = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isTermsOpen, onToggle } = useDisclosure()
  const [md, setMd] = useState('')

  const { locale } = useSelector(state => state.locale)

  useEffect(() => {
    const terms = {
      tr: terms_tr,
      nl: terms_nl,
      en: terms_en,
    }
    const loadMd = async () => {
      const res = await fetch(terms[locale])
      const txt = await res.text()
      setMd(txt)
    }

    loadMd()
  }, [locale])

  const handleChange = lang => {
    dispatch(setLocale(lang))
  }

  const locales = [
    {
      locale: 'tr',
      icon: tr,
      name: 'Türkçe',
    },
    {
      locale: 'en',
      icon: en,
      name: 'English',
    },
    {
      locale: 'nl',
      icon: nl,
      name: 'Nederlands',
    },
  ]

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
          <Image loading='lazy' h={16} src={logoAlt} />
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
      <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} onClick={onClose}>
                {token ? (
                  <ThemeButton
                    w='full'
                    onClick={() => {
                      dispatch(logoutUser())
                      history.push('/')
                    }}
                  >
                    {t('auth.logout')}
                  </ThemeButton>
                ) : (
                  <ThemeButton w='full' as={Link} to='/login'>
                    {t('auth.login')}
                  </ThemeButton>
                )}
                <ThemeButton onClick={onToggle} w='full'>
                  {t('terms')}
                </ThemeButton>
                {locales.map(({ locale, name, icon }) => (
                  <Button
                    variant='ghost'
                    key={locale}
                    minH='48px'
                    onClick={() => handleChange(locale)}
                    w='full'
                    justifyContent='flex-start'
                    borderWidth='2px'
                    borderColor='light.orange'
                  >
                    <Image
                      loading='lazy'
                      boxSize='2rem'
                      borderRadius='full'
                      src={icon}
                      alt='tr'
                      mr={4}
                    />
                    <span>{name}</span>
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <MarkdownModal content={md} isOpen={isTermsOpen} onToggle={onToggle} />
    </Container>
  )
}

export default Navbar
