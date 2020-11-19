import i18n from '../../i18n'

export const localeReducers = {
  setLocale: (state, action) => {
    i18n.changeLanguage(action.payload)
    state.locale = action.payload
  },
}
