import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormField from './form-field'
import { Button, useToast, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'
import { loginUser } from '../store/auth/actions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const AuthForm = ({ isRegistering }) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const history = useHistory()

  const { t } = useTranslation()
  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('form.errors.email_invalid'))
      .required(t('form.errors.email_required')),
    password: yup.string().required(t('form.errors.password_required')),
  })

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('form.errors.email_invalid'))
      .required(t('form.errors.email_required')),
    password: yup.string().required(t('form.errors.password_required')),
  })

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(isRegistering ? registerSchema : loginSchema),
  })

  const onRegister = async data => {
    const { email, password } = data
    setIsLoading(true)
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/local/register`,
        { email, password, username: email }
      )

      if (res.status === 200) {
        toast({
          title: t('register_success.title'),
          description: t('register_success.description'),
          duration: 5000,
          status: 'success',
        })
        reset()
      }
    } catch (error) {
      console.log('error.response', error.response)
      const fields = ['email', 'username']

      fields.forEach(field => {
        if (
          error?.response?.data?.message[0]?.messages[0]?.id ===
          `Auth.form.error.${field}.taken`
        ) {
          toast({
            title: t(`form.${field}_taken.title`),
            description: t(`form.${field}_taken.description`),
            duration: 5000,
            status: 'error',
          })
        }
      })
    } finally {
      setIsLoading(false)
    }
  }
  const onLogin = async data => {
    const { email, password } = data
    setIsLoading(true)
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/local`,
        { identifier: email, password }
      )

      if (res.status !== 200)
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`)

      const { jwt, user } = res.data

      dispatch(loginUser({ token: jwt, user }))
      setIsLoading(true)
      toast({
        title: t('login_success.title'),
        description: t('login_success.description'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => history.push('/'), 3000) // Redirect to homepage after 3 sec
    } catch (error) {
      console.log('error.response', error.response)
      const fields = ['invalid', 'confirmed']

      fields.forEach(field => {
        if (
          error?.response?.data?.message[0]?.messages[0]?.id ===
          `Auth.form.error.${field}`
        ) {
          toast({
            title: t(`auth.${field}.title`),
            description: t(`auth.${field}.description`),
            duration: 5000,
            status: 'error',
          })
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack
      onSubmit={handleSubmit(isRegistering ? onRegister : onLogin)}
      w='full'
      as='form'
    >
      <FormField
        register={register}
        label={t('form.email')}
        name='email'
        type='email'
        placeholder={t('form.email')}
        isInvalid={!!errors.email}
        error={errors?.email?.message}
      />

      <FormField
        register={register}
        label={t('form.password')}
        name='password'
        placeholder={t('form.password')}
        isInvalid={!!errors.password}
        error={errors?.password?.message}
      />
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
        // isLoading={isLoading}
      >
        {isRegistering ? t('auth.register') : t('auth.login')}
      </Button>
    </VStack>
  )
}

export default AuthForm
