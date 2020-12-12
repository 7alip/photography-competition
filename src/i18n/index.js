import i18n from 'i18next'
import backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import LanagugeDetector from 'i18next-browser-languagedetector'

import tr from './translations/tr.json'
import en from './translations/en.json'
import nl from './translations/nl.json'

i18n
  .use(backend)
  .use(LanagugeDetector)
  .use(initReactI18next)
  .init({
    resources: { tr, en, nl },
    fallbackLng: 'tr',
    debug: true,
    preload: ['tr', 'en', 'nl'],
    react: {
      wait: true,
      useSuspense: false,
    },
  })

export default i18n
