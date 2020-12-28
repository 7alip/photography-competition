import React, { useEffect } from 'react'
import { Container, Flex, Image, SimpleGrid } from '@chakra-ui/react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { competitionsLoaded } from '../store/competition/actions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox-pro'

const Test = () => {
  const { token, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const { competitions } = useSelector(state => state.competition)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/competitions?_sort=published_at:DESC`
          // { headers: { Authorization: `Bearer ${token}` } }
        )

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
    <SimpleReactLightbox>
      <Container maxW='xl'>
        <SRLWrapper>
          <SimpleGrid gap={4} flex={1} columns={[1, 2, 4]}>
            {competitions.map(competition => (
              <Flex
                align='center'
                key={competition.id}
                borderWidth='2px'
                borderColor='gray.200'
                bg='white'
              >
                <Image
                  as={LazyLoadImage}
                  effect='blur'
                  loading='lazy'
                  width='100%'
                  height={200}
                  objectFit='contain'
                  p={1}
                  src={
                    process.env.REACT_APP_BACKEND_URL + competition?.image?.url
                  }
                  alt={competition?.title}
                />
              </Flex>
            ))}
          </SimpleGrid>
        </SRLWrapper>
      </Container>
    </SimpleReactLightbox>
  )
}

export default Test
