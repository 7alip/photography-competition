import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import votingSVG from '../assets/img/voting.svg'
import photoSVG from '../assets/img/photo.svg'
import trCover from '../assets/img/tr_cover.svg'
import enCover from '../assets/img/en_cover.svg'
import nlCover from '../assets/img/nl_cover.svg'
import HomeCard from '../components/home-card'
import content_tr from '../content/competition-tr.md'
import content_nl from '../content/competition-nl.md'
import content_en from '../content/competition-en.md'
import MarkdownModal from '../components/markdown-modal'

const HomeTest = () => {
  const { user, token } = useSelector(state => state.auth)
  const [md, setMd] = useState('')
  const { t } = useTranslation()
  const { locale } = useSelector(state => state.locale)
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    onToggle()
  }, [])

  useEffect(() => {
    const content = {
      tr: content_tr,
      nl: content_nl,
      en: content_en,
    }
    const loadMd = async () => {
      const res = await fetch(content[locale])
      const txt = await res.text()
      setMd(txt)
    }

    loadMd()
  }, [locale])

  const coverImageSrc = locale => {
    if (locale === 'nl') return nlCover
    if (locale === 'en') return enCover
    return trCover
  }

  return (
    <Container maxW='lg'>
      <MarkdownModal content={md} isOpen={isOpen} onToggle={onToggle} />
      <VStack spacing={4} align='center' justify='center' maxW='full'>
        {token && (
          <Heading textAlign='center' as='h3' my={2} size='md'>
            {t('welcome')} {user.username}
          </Heading>
        )}
        <Box maxW={[300, 400]}>
          <Image loading='lazy' src={coverImageSrc(locale)} alt='cover image' />
        </Box>
        <Flex w='full' flexWrap='wrap' align='center' justify='center'>
          <HomeCard to='/competition' image={photoSVG} text='request_apply' />
          <HomeCard to='/voting' image={votingSVG} text='request_voting' />
        </Flex>
      </VStack>
    </Container>
  )
}

export default HomeTest
