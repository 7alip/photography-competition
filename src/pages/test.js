import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button } from '@chakra-ui/react'

import { getUser } from '../store/auth/state'
import { login, logout } from '../store/auth/actions'

const Test = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  return (
    <Box>
      <Button onClick={() => dispatch(login({ user: 'HEY' }))}>Login</Button>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      {JSON.stringify(user)}
    </Box>
  )
}

export default Test
