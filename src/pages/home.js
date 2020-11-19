import React from 'react'
import { Box, Flex, Heading, Image, VStack } from '@chakra-ui/react'

import VotingSVG from '../components/svg/voting-svg'
import PhotoSVG from '../components/svg/photo-svg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import trCover from '../assets/img/tr_cover.svg'
import enCover from '../assets/img/en_cover.svg'
import nlCover from '../assets/img/nl_cover.svg'

const Home = () => {
  const { user, token } = useSelector(state => state.auth)
  const { t } = useTranslation()
  const { locale } = useSelector(state => state.locale)

  const coverImageSrc = locale => {
    if (locale === 'nl') return nlCover
    if (locale === 'en') return enCover
    return trCover
  }

  return (
    <VStack mt={4} spacing={8} align='center' justify='center' maxW='full'>
      {token && (
        <Heading textAlign='center' as='h3' my={5} size='md'>
          {t('welcome')} {user.username}
        </Heading>
      )}
      <Box maxW={[300, 400]}>
        <Image src={coverImageSrc(locale)} alt='cover image' />
      </Box>
      <Flex w='full' flexWrap='wrap' align='center' justify='center'>
        <Link to='/competition'>
          <Box
            transition='all 200ms ease-in-out'
            borderWidth={4}
            borderColor='transparent'
            borderRadius='md'
            _hover={{ borderColor: 'light.orange' }}
            cursor='pointer'
          >
            <Box m={2} p={2} textAlign='center' bg='white' boxShadow='md'>
              <PhotoSVG w={300} />
              <Heading as='h3' size='md' mb={3}>
                {t('request_apply')}
              </Heading>
            </Box>
          </Box>
        </Link>
        <Link to='/voting'>
          <Box
            transition='all 200ms ease-in-out'
            borderWidth={4}
            borderColor='transparent'
            borderRadius='md'
            _hover={{ borderColor: 'light.orange' }}
            cursor='pointer'
          >
            <Box m={2} p={2} textAlign='center' bg='white' boxShadow='md'>
              <VotingSVG w={300} />
              <Heading as='h3' size='md' mb={3}>
                {t('request_voting')}
              </Heading>
            </Box>
          </Box>
        </Link>
      </Flex>
    </VStack>
  )
}

export default Home
