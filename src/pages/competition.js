import { Container, Flex, Skeleton } from '@chakra-ui/react'

import CompetitionForm from '../components/competition-form'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import HasApplied from '../components/has-applied'
import { useSelector } from 'react-redux'

const Competition = () => {
  const [appliedPhoto, setAppliedPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  const { user, token } = useSelector(state => state.auth)

  useEffect(() => {
    const checkIfUserHasAlreadyApplied = async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?owner=${user.id}`
        )

        if (res.data && res.data[0] && res.data[0].length !== 0) {
          return setHasApplied(true)
        }

        setAppliedPhoto(res.data[0]?.image?.url)
      } catch (error) {
        console.log('___ERROR___', error.type, error.response, error)
      }
    }
    checkIfUserHasAlreadyApplied()
  }, [user.id])

  return (
    <Container alignSelf='stretch' maxW='lg' mx='auto'>
      {hasApplied ? (
        <Flex flex={1} flexDir='column' justify='center' align='center'>
          <Skeleton isLoaded={!loading}>
            <HasApplied appliedPhoto={appliedPhoto} />
          </Skeleton>
        </Flex>
      ) : (
        <CompetitionForm />
      )}
    </Container>
  )
}

export default Competition
