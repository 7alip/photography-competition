import { Button } from '@chakra-ui/react'

const ThemeButton = ({ isDark, isReversed, icon, children, ...rest }) => {
  return (
    <Button
      leftIcon={icon}
      borderColor={
        !isReversed ? 'transparent' : isDark ? 'dark.orange' : 'light.orange'
      }
      color={!isReversed ? 'white' : isDark ? 'dark.orange' : 'light.orange'}
      bg={isReversed ? 'white' : isDark ? 'dark.orange' : 'light.orange'}
      borderWidth={2}
      _hover={{
        color: isReversed ? 'white' : isDark ? 'dark.orange' : 'light.orange',
        borderColor: isReversed
          ? 'transparent'
          : isDark
          ? 'dark.orange'
          : 'light.orange',
        bg: !isReversed ? 'white' : isDark ? 'dark.orange' : 'light.orange',
      }}
      {...rest}
    >
      {children || 'Giriş'}
    </Button>
  )
}

export default ThemeButton
