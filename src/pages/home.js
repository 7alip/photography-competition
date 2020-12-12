import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
import afisEn from '../assets/img/afis_en.jpg'
import afisNl from '../assets/img/afis_nl.jpg'
import afisTr from '../assets/img/afis_tr.jpg'
import HomeCard from '../components/home-card'
import { InfoIcon } from '@chakra-ui/icons'
import ThemeButton from '../components/theme-button'

const HomeTest = () => {
  const { user, token } = useSelector(state => state.auth)
  const { t } = useTranslation()
  const { locale } = useSelector(state => state.locale)
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    onToggle()
  }, [])

  const coverImageSrc = locale => {
    if (locale === 'nl') return nlCover
    if (locale === 'en') return enCover
    return trCover
  }

  const modalImageSrc = locale => {
    if (locale === 'nl') return afisNl
    if (locale === 'en') return afisEn
    return afisTr
  }

  return (
    <Container maxW='lg'>
      {/* <ThemeButton
        w={10}
        h={10}
        borderRadius='full'
        position='fixed'
        bottom={7}
        right={4}
        onClick={onToggle}
      >
        <InfoIcon />
      </ThemeButton> */}
      <Modal
        isOpen={isOpen}
        onClose={onToggle}
        // isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent overflowY='auto'>
          <ModalCloseButton />
          <Image src={modalImageSrc(locale)} />
        </ModalContent>
      </Modal>
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
