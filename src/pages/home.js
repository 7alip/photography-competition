import React from 'react'
import { Box, Flex, Heading, Image, VStack } from '@chakra-ui/react'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import votingSVG from '../assets/img/voting.svg'
import photoSVG from '../assets/img/photo.svg'
import trCover from '../assets/img/tr_cover.svg'
import enCover from '../assets/img/en_cover.svg'
import nlCover from '../assets/img/nl_cover.svg'
import HomeCard from '../components/home-card'

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
        <HomeCard to='/competition' image={photoSVG} text='request_apply' />
        <HomeCard to='/voting' image={votingSVG} text='request_voting' />
      </Flex>
    </VStack>
  )
}

export default Home
