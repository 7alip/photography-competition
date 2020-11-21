import { Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <VStack w='full' flex={1} justify='center' align='center'>
      <Heading size='4xl'>404</Heading>
      <Text>{t('not_found')}</Text>
    </VStack>
  )
}

export default NotFound
