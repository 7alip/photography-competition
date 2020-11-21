import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginFails, loginUser } from '../store/auth/actions'
import Axios from 'axios'
import { useToast } from '@chakra-ui/react'
import Loader from '../components/loader'
import { useTranslation } from 'react-i18next'

const backendUrl = process.env.REACT_APP_BACKEND_URL

const LoginRedirect = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const params = useParams()
  const history = useHistory()

  const toast = useToast()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await Axios.get(
          `${backendUrl}/auth/${params.providerName}/callback${location.search}`
        )

        if (res.status !== 200)
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`)

        const { jwt, user } = res.data

        dispatch(loginUser({ token: jwt, user }))
        setLoading(true)
        toast({
          title: t('login_success.title'),
          description: t('login_success.description'),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setTimeout(() => history.push('/'), 3000) // Redirect to homepage after 3 sec
      } catch (error) {
        dispatch(loginFails())
        if (error.response.status === 400)
          toast({
            title: t('login_error.title'),
            description: t('login_error.description'),
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        setLoading(true)
        setTimeout(() => {
          history.push('/login')
        }, 5000)
      }
    }

    checkLoggedIn()
  }, [history, location.search, t, dispatch, params.providerName, toast])

  return loading ? <Loader /> : ''
}

export default LoginRedirect
