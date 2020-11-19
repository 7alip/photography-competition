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
  Textarea,
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import Axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import TermsModal from './terms-modal'
import ThemeButton from './theme-button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GoLinkExternal } from 'react-icons/go'
import { useTranslation } from 'react-i18next'
import { translateFormSchema } from '../lib/translateFormSchema'

const calculatePercent = (value, total) => Math.round((value / total) * 100)

const CompetitionForm = () => {
  const [percent, setPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [successfull, setSuccessfull] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user, token } = useSelector(state => state.auth)
  const { t } = useTranslation()
  const schema = translateFormSchema(t)

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleBlurImage = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
    } else {
      setImagePreview(null)
    }
  }

  const onSubmit = async data => {
    const { fullName, story, phone, image, title } = data
    const formData = new FormData()

    formData.append('files.image', image[0])

    formData.append(
      'data',
      JSON.stringify({
        name: fullName,
        title,
        story,
        phone,
        email: user.email,
        owner: user.id,
      })
    )

    if (user) {
      setIsLoading(true)
      try {
        const res = await Axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND_URL}/competitions`,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: ({ loaded, total }) =>
            setPercent(calculatePercent(loaded, total)),
        })
        if (res.status === 200) setSuccessfull(true)
      } catch (error) {
        console.log('___ERROR___', error.type, error.response, error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (successfull)
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
            <Avatar name={user?.name || user?.username} src={user?.image} />
            <Box ml={3}>
              <Heading as='h4' size='lg'>
                {user?.name || user?.username}
              </Heading>
              <Text fontSize='sm'>{user?.email}</Text>
            </Box>
          </HStack>

          <FormControl isInvalid={!!errors.fullName}>
            <FormLabel>{t('form.fullname')}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Box color='gray.300'>
                  <FaEnvelope />
                </Box>
              </InputLeftElement>
              <Input
                name='fullName'
                ref={register}
                defaultValue={user?.name || user?.username || ''}
                type='text'
                placeholder={t('form.fullname')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel>{t('form.photo_title')}</FormLabel>
            <InputGroup>
              <Input
                name='title'
                ref={register}
                type='text'
                placeholder={t('form.photo_title')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.story}>
            <FormLabel>{t('form.story')}</FormLabel>
            <InputGroup>
              <Textarea
                name='story'
                ref={register}
                type='text'
                placeholder={t('form.story')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.story?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>{t('form.phone')}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Box color='gray.300'>
                  <FaPhone />
                </Box>
              </InputLeftElement>
              <Input
                name='phone'
                ref={register}
                type='phone'
                placeholder={t('form.phone')}
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!errors.image}>
            <FormLabel>{t('form.photo')}</FormLabel>
            <InputGroup>
              <Input
                name='image'
                ref={register}
                type='file'
                onBlur={handleBlurImage}
                accept='image/png, image/jpeg, image/jpg'
              />
            </InputGroup>
            <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
          </FormControl>
          <FormControl py={4} isInvalid={!!errors.accepted}>
            <InputGroup>
              <Checkbox size='lg' ref={register} name='accepted'>
                <Text fontSize='sm'>{t('form.accept')}</Text>
              </Checkbox>
              <Box
                _hover={{ color: 'light.orange' }}
                onClick={onOpen}
                cursor='pointer'
                ml={4}
                boxSize={4}
                as={GoLinkExternal}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.accepted?.message}</FormErrorMessage>
          </FormControl>

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
            {t('form.apply')}
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
            src={imagePreview || '/logo.svg'}
          />
        </Flex>
      </Box>
      <TermsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default CompetitionForm
