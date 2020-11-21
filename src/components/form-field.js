import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React from 'react'

const FormField = ({
  error,
  label,
  placeholder,
  isInvalid,
  defaultValue,
  register,
  name,
  type,
  icon,
  as,
  ...rest
}) => {
  const Tag = as || Input
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents='none'>
            <Box color='gray.300'>{icon}</Box>
          </InputLeftElement>
        )}
        <Tag
          name={name}
          ref={register}
          type={type || 'text'}
          placeholder={placeholder}
          {...rest}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default FormField
