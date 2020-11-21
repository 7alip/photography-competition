import { Container, Flex, useToast } from '@chakra-ui/react'

import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/loader'
import HasApplied from '../components/has-applied'
import CompetitionForm from '../components/competition-form'
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../store/auth/actions'
import { useTranslation } from 'react-i18next'

const Competition = () => {
  const [appliedPhoto, setAppliedPhoto] = useState(null)
  const [hasApplied, setHasApplied] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, token } = useSelector(state => state.auth)
  const toast = useToast()
  const history = useHistory()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  useEffect(() => {
    const checkIfUserHasAlreadyApplied = async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?owner=${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setAppliedPhoto(res.data[0]?.image?.url)

        if (res.data && res.data[0] && res.data[0].length !== 0) {
          setHasApplied(true)
        }
      } catch (error) {
        console.log('error.response', error.response)
        if (error.response?.status === 401) {
          toast({
            title: t('session_error.title'),
            description: t('session_error.description'),
            status: 'warning',
            duration: 3000,
          })
          setLoading(true)
          setTimeout(() => {
            dispatch(logoutUser())
            history.push('/login')
          }, 3000)
        }
      } finally {
        setLoading(false)
      }
    }
    checkIfUserHasAlreadyApplied()
  }, [user?.id, token, toast, t, dispatch, history])

  if (loading) return <Loader />

  return (
    <Container alignSelf='stretch' maxW='lg' mx='auto'>
      {hasApplied ? (
        <Flex flex={1} flexDir='column' justify='center' align='center'>
          <HasApplied appliedPhoto={appliedPhoto} />
        </Flex>
      ) : (
        <CompetitionForm />
      )}
    </Container>
  )
}

export default Competition
