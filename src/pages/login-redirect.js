import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginFails, login } from '../store/auth/actions'

const backendUrl = process.env.REACT_APP_BACKEND_URL

const LoginRedirect = () => {
  const [text, setText] = useState('Loading...')
  const location = useLocation()
  const params = useParams()
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Successfully logged with the provider
        // Now logging with strapi by using the access_token (given by the provider) in props.location.search
        const res = await fetch(
          `${backendUrl}/auth/${params.providerName}/callback${location.search}`
        )

        if (res.status !== 200)
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`)

        const { jwt, user } = await res.json()

        if (jwt) {
          // Successfully logged with Strapi
          // Now saving the jwt to use it for future authenticated requests to Strapi
          dispatch(login({ token: jwt, user }))
          setText(
            'You have been successfully logged in. You will be redirected in a few seconds...'
          )
          setTimeout(() => history.push('/'), 3000) // Redirect to homepage after 3 sec
        } else dispatch(loginFails('Hata olustu'))
      } catch (error) {
        console.error('error', error)
        dispatch(loginFails('Hata olustu'))
        setText('An error occurred, please see the developer console.')
      }
    }

    checkLoggedIn()
  }, [history, location.search, dispatch, params.providerName])

  return <p>{text}</p>
}

export default LoginRedirect
