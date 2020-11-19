import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Text,
  VStack,
  Flex,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import Axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import TermsModal from './terms-modal'
import ThemeButton from './theme-button'
import { Link } from 'react-router-dom'

const calculatePercent = (value, total) => Math.round((value / total) * 100)

const schema = yup.object().shape({
  fullName: yup.string().required('Tam adınızı girmeniz zorunludur!'),
  phone: yup.string(),
  title: yup
    .string()
    .required('Fotoğrafınız için bir başlık belirtmeniz zorunludur!'),
  description: yup.string(),
  image: yup
    .mixed()
    .required('Please pick a photo')
    .test(
      'fileSize',
      'The file size is too large',
      value => value && value[0].size <= 2
    ),
})

const CompetitionForm = ({ session, userId }) => {
  const [percent, setPercent] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const images = watch('image') || []

  console.log('images', images[0])
  console.log('errors', errors)

  const onSubmit = async data => {
    console.log('image', data)
    // const formData = new FormData()
    // const image = images[0]
    // formData.append('files.image', image)
    // formData.append(
    //   'data',
    //   JSON.stringify({
    //     name: fullName,
    //     phone,
    //     title,
    //     owner: userId,
    //   })
    // )

    // if (userId) {
    //   setIsLoading(true)
    //   try {
    //     const res = await Axios({
    //       method: 'post',
    //       url: `${process.env.REACT_APP_BACKEND_URL}/photos`,
    //       data: formData,
    //       onUploadProgress: ({ loaded, total }) =>
    //         setPercent(calculatePercent(loaded, total)),
    //     })
    //     if (res.status === 200) setHasApplied(true)
    //   } catch (error) {
    //     console.log('___ERROR___', error.type, error.response, error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
  }

  if (hasApplied)
    return (
      <VStack flex={1} h='full' w='full' align='center' justify='center'>
        <Heading my={3} as='h2' size='lg'>
          Başvurunuz başarıyla gerçekleşmiştir
        </Heading>
        <HStack spacing={3}>
          <Link to='/'>
            <ThemeButton>Anasayfa</ThemeButton>
          </Link>
          <Link to='/voting'>
            <ThemeButton>Oy Kullan</ThemeButton>
          </Link>
        </HStack>
      </VStack>
    )

  return (
    <Flex w='full' flexWrap='wrap'>
      <Box w={['full', null, 1 / 2]} p={3}>
        <VStack
          bg='white'
          borderRadius='md'
          boxShadow='md'
          p={4}
          as='form'
          spacing={3}
          onSubmit={handleSubmit(onSubmit)}
        >
          <HStack>
            <Avatar name={session?.user?.name} src={session?.user?.image} />
            <Box ml={3}>
              <Heading as='h4' size='lg'>
                {session?.user?.name}
              </Heading>
              <Text fontSize='sm'>{session?.user?.email}</Text>
            </Box>
          </HStack>
          <FormControl isInvalid={!!errors.fullName}>
            <FormLabel>Ad Soyad</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaEnvelope color='gray.300' />
              </InputLeftElement>
              <Input
                name='fullName'
                ref={register}
                defaultValue={session?.user?.name || ''}
                type='text'
                placeholder='Ad Soyad'
              />
            </InputGroup>
            <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Fotoğraf Başlığı</FormLabel>
            <InputGroup>
              <Input
                name='title'
                ref={register}
                type='text'
                placeholder='Fotoğraf Başlığı'
              />
            </InputGroup>
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Telefon</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaPhone color='gray.300' />
              </InputLeftElement>
              <Input
                name='phone'
                ref={register}
                type='phone'
                placeholder='Telefon'
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!errors.image}>
            <FormLabel>Photo</FormLabel>
            <InputGroup>
              <Input name='image' ref={register} type='file' />
            </InputGroup>
            <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
          </FormControl>
          <HStack my={4}>
            <Checkbox
              ref={register}
              name='acc'
              onChange={e => setAccepted(e.target.checked)}
            />
            <Text fontSize='sm'>
              <Text
                cursor='pointer'
                fontWeight='bold'
                onClick={e => {
                  e.stopPropagation()
                  onOpen()
                }}
                as='span'
                color='light.orange'
              >
                Katılım şartlarını
              </Text>{' '}
              okudum ve kabul ediyorum.
            </Text>
          </HStack>

          <Button
            w='full'
            borderWidth={2}
            borderColor='transparent'
            _hover={{
              color: 'light.orange',
              borderColor: 'light.orange',
              bg: 'white',
            }}
            color='white'
            bg='light.orange'
            type='submit'
            isLoading={isLoading}
          >
            Apply
          </Button>
          <Progress size='sm' value={percent} />
        </VStack>
      </Box>
      <Box w={['full', null, 1 / 2]} p={3}>
        <Flex
          p={3}
          borderRadius='md'
          overflow='hidden'
          justify='center'
          align='center'
          h='full'
        >
          <Image
            maxH={350}
            objectFit='cover'
            src={images.length > 0 ? images[0].preview : '/logo.svg'}
          />
        </Flex>
      </Box>
      <TermsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default CompetitionForm
