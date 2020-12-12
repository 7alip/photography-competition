import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppRoutes = ({
  component: Component,
  path,
  exact,
  isPrivate,
  ...rest
}) => {
  const auth = useSelector(state => state.auth)
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isPrivate && !Boolean(auth.token) ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  )
}

export default AppRoutes
