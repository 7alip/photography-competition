import { Box, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const HasApplied = ({ appliedPhoto }) => {
  const { t } = useTranslation()
  const url =
    process.env.NODE_ENV === 'production'
      ? appliedPhoto
      : process.env.REACT_APP_BACKEND_URL + appliedPhoto

  return (
    <VStack justify='center' flex={1} spacing={8} align='center'>
      <Box my={4}>
        <Image boxSize={320} objectFit='cover' src={url} />
      </Box>
      <Heading textAlign='center' as='h3' size='sm'>
        {t('has_applied')}
      </Heading>
    </VStack>
  )
}

export default HasApplied
