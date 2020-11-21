import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Image,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  competitionError,
  competitionsLoaded,
  competitionsLoading,
  loadVotedCompetitions,
} from '../store/competition/actions'

const url =
  process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_BACKEND_URL

const Test = () => {
  const { token, user } = useSelector(state => state.auth)
  const { isOpen, onToggle } = useDisclosure()
  const dispatch = useDispatch()

  const { competitions } = useSelector(state => state.competition)

  const handleChange = selectedImages => console.log(selectedImages)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?_sort=published_at:DESC&voters.id_nin=${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const resVoted = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?voters.id_in=${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        console.log('resVoted', resVoted)

        if (res.data?.length > 0) {
          dispatch(competitionsLoaded(res.data))
        }
      } catch (error) {
        console.log('error', error.response)
      }
    }

    fetchImages()
  }, [token, user.id, dispatch])

  return (
    <Container maxW='xl'>
      <SimpleGrid gap={4} flex={1} columns={[1, 2, 4]}>
        {competitions.map(competition => (
          <Box key={competition.id}>
            <Image
              w='full'
              h={200}
              objectFit='cover'
              src={url + competition?.image?.url}
            />
          </Box>
        ))}
      </SimpleGrid>
      {<Button>Click</Button>}
    </Container>
  )
}

export default Test
