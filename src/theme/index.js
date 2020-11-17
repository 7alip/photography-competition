import { extendTheme } from '@chakra-ui/react'
import components from './components'
import colors from './colors'
import styles from './styles'

export default extendTheme({
  styles,
  components,
  fonts: {
    body: `'Poppins', 'Roboto', sans-serif`,
    heading: `'Poppins', 'Roboto', sans-serif`,
    logo: `'Rubik', sans-serif`,
  },
  colors,
  shadows: {
    outline: 'none',
    dark: {
      box: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    },
    light: {
      box: '1px 1px 2px rgba(0, 0, 0, 0.15)',
    },
  },
})
