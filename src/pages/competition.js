import { Flex, useToast } from '@chakra-ui/react'

import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/loader'
import HasApplied from '../components/has-applied'
import CompetitionForm from '../components/competition-form'
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../store/auth/actions'
import { useTranslation } from 'react-i18next'
import { saveApplied, saveAppliedPhoto } from '../store/competition/actions'

const Competition = () => {
  const [loading, setLoading] = useState(false)
  const { user, token } = useSelector(state => state.auth)
  const toast = useToast()
  const history = useHistory()
  const dispatch = useDispatch()

  const { hasApplied, appliedPhoto } = useSelector(state => state.competition)

  const { t } = useTranslation()

  useEffect(() => {
    const checkIfUserHasAlreadyApplied = async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?owner=${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (res.data && res.data[0] && res.data[0].length !== 0) {
          dispatch(saveAppliedPhoto(res.data[0]?.image?.url))
          dispatch(saveApplied())
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

    if (!hasApplied) checkIfUserHasAlreadyApplied()
  }, [user?.id, token, hasApplied, toast, t, dispatch, history])

  if (loading) return <Loader />
  if (hasApplied)
    return (
      <Flex flex={1} flexDir='column' justify='center' align='center' h='full'>
        <HasApplied appliedPhoto={appliedPhoto} />
      </Flex>
    )

  return <CompetitionForm />
}

export default Competition
