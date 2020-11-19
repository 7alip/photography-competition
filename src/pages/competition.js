import { Box, Container, Flex, Skeleton } from '@chakra-ui/react'

import CompetitionForm from '../components/competition-form'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import CompetitionApplication from '../components/competition-applied'
import { useSelector } from 'react-redux'

const Competition = ({ session }) => {
  const [appliedPhoto, setAppliedPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [userId, setUserId] = useState(undefined)

  const { user, token } = useSelector(state => state.auth)

  return (
    <Container alignSelf='stretch' maxW='lg' mx='auto'>
      {appliedPhoto?.image ? (
        <Flex flex={1} flexDir='column' justify='center' align='center'>
          <Skeleton isLoaded={!loading}>
            <CompetitionApplication appliedPhoto={appliedPhoto} />
          </Skeleton>
        </Flex>
      ) : (
        <CompetitionForm userId={userId} session={session} />
      )}
    </Container>
  )
}

export default Competition
