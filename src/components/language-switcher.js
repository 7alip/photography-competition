import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react'
import tr from '../assets/img/tr.svg'
import en from '../assets/img/en.svg'
import nl from '../assets/img/nl.svg'
import i18n from '../i18n'

const LanguageSwitcher = () => {
  const handleChange = lang => {
    i18n.changeLanguage(lang)
  }

  const lang = i18n.language

  console.log('lang', lang)
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
    <Menu>
      <MenuButton>
        <Image
          boxSize={10}
          src={lang === 'tr' ? tr : lang === 'en' ? en : nl}
        />
      </MenuButton>
      <MenuList>
        {locales.map(({ locale, name, icon }) => (
          <MenuItem
            key={locale}
            minH='48px'
            onClick={() => handleChange(locale)}
          >
            <Image
              boxSize='2rem'
              borderRadius='full'
              src={icon}
              alt='tr'
              mr='12px'
            />
            <span>{name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitcher
