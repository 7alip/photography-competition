import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  InputGroup,
  Progress,
  Text,
  VStack,
  Flex,
  Image,
  useDisclosure,
  Textarea,
  useToast,
  Container,
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import Axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoLinkExternal } from 'react-icons/go'
import { useTranslation } from 'react-i18next'
import { logoutUser } from '../store/auth/actions'
import FormField from './form-field'
import logo from '../assets/img/logo.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as yup from 'yup'
import terms_en from '../content/terms-en.md'
import terms_nl from '../content/terms-nl.md'
import terms_tr from '../content/terms-tr.md'
import MarkdownModal from './markdown-modal'
import applied from '../assets/img/applied.svg'

const calculatePercent = (value, total) => Math.round((value / total) * 100)

const CompetitionForm = () => {
  const [percent, setPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [successfull, setSuccessfull] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { isOpen, onOpen, onToggle } = useDisclosure()
  const { locale } = useSelector(state => state.locale)
  const [md, setMd] = useState('')

  const toast = useToast()
  const dispatch = useDispatch()

  const { user, token } = useSelector(state => state.auth)
  const { t } = useTranslation()

  useEffect(() => {
    const terms = {
      tr: terms_tr,
      nl: terms_nl,
      en: terms_en,
    }
    const loadMd = async () => {
      const res = await fetch(terms[locale])
      const txt = await res.text()
      setMd(txt)
    }

    loadMd()
  }, [locale])

  const schema = yup.object().shape({
    fullName: yup.string().required(t('form.errors.name_required')),
    phone: yup.string(),
    title: yup.string().required(t('form.errors.title_required')),
    story: yup.string(),
    accepted: yup.bool().oneOf([true], t('form.errors.accept_required')),
    image: yup.mixed().required(t('form.errors.photo_required')),
    // .test(
    //   'fileSize',
    //   t('form.errors.photo_size'),
    //   value => value && value[0] && value[0].size <= 15 * 1000 * 1000
    // ),
  })

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
        if (error.response?.status) {
          toast({
            title: t('session_error.title'),
            description: t('session_error.description'),
            duration: 5000,
            status: 'error',
          })

          setTimeout(() => {
            dispatch(logoutUser())
          }, 5000)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (successfull)
    return (
      <VStack flex={1} h='full' w='full' align='center' justify='center'>
        <Image src={applied} maxW='500px' mb={8} />
        <Heading my={3} as='h2' size='lg'>
          {t('apply_success')}
        </Heading>
      </VStack>
    )

  return (
    <Container alignSelf='stretch' maxW='lg' mx='auto' h='full'>
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

            <FormField
              register={register}
              label={t('form.fullname')}
              icon={<FaEnvelope />}
              name='fullName'
              defaultValue={user?.name || user?.username || ''}
              placeholder={t('form.fullname')}
              isInvalid={!!errors.fullName}
              error={errors?.fullName?.message}
            />

            <FormField
              register={register}
              label={t('form.photo_title')}
              name='title'
              placeholder={t('form.photo_title')}
              isInvalid={!!errors.title}
              error={errors?.title?.message}
            />

            <FormField
              register={register}
              as={Textarea}
              label={t('form.story')}
              name='story'
              placeholder={t('form.story')}
              isInvalid={!!errors.story}
              error={errors?.story?.message}
            />

            <FormField
              register={register}
              icon={<FaPhone />}
              label={t('form.phone')}
              name='phone'
              placeholder={t('form.phone')}
              isInvalid={!!errors.phone}
              error={errors?.phone?.message}
            />

            <FormField
              register={register}
              type='file'
              label={t('form.photo')}
              name='image'
              isInvalid={!!errors.image}
              error={errors?.image?.message}
              onBlur={handleBlurImage}
              accept='image/png, image/jpeg, image/jpg'
            />

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
              as={LazyLoadImage}
              effect='blur'
              loading='lazy'
              maxH={350}
              objectFit='cover'
              src={imagePreview || logo}
            />
          </Flex>
        </Box>
        <MarkdownModal content={md} isOpen={isOpen} onToggle={onToggle} />
      </Flex>
    </Container>
  )
}

export default CompetitionForm
