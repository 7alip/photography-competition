import React from 'react'
import { Image, VStack, HStack } from '@chakra-ui/react'
import tr from '../assets/img/tr.svg'
import en from '../assets/img/en.svg'
import nl from '../assets/img/nl.svg'
import { useDispatch } from 'react-redux'
import { setLocale } from '../store/locale/actions'

const LanguageSwitcher = () => {
  const dispatch = useDispatch()

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
    <VStack align='start'>
      {locales.map(({ locale, name, icon }) => (
        <HStack key={locale} minH='48px' onClick={() => handleChange(locale)}>
          <Image
            loading='lazy'
            boxSize='2rem'
            borderRadius='full'
            src={icon}
            alt='tr'
            mr='12px'
          />
          <span>{name}</span>
        </HStack>
      ))}
    </VStack>
  )
}

export default LanguageSwitcher
