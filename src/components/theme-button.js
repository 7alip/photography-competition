import { Button } from '@chakra-ui/react'

const ThemeButton = ({ icon, children, ...rest }) => {
  return (
    <Button
      leftIcon={icon}
      borderColor='transparent'
      borderWidth={2}
      _hover={{
        color: 'light.orange',
        borderColor: 'light.orange',
        bg: 'white',
      }}
      color='white'
      bg='light.orange'
      {...rest}
    >
      {children || 'Giriş'}
    </Button>
  )
}

export default ThemeButton
