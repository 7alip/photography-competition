let language = localStorage.getItem('i18nextLng')

if (!language) language = 'en'
if (language && language.includes('en')) language = 'en'

export const localeState = {
  locale: language,
}
