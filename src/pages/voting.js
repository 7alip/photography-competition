import React, { useEffect, useState } from 'react'
import { Container, Image, SimpleGrid } from '@chakra-ui/react'
import Axios from 'axios'

const Test = () => {
  const [images, setImages] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/competitions`
      )

      const competitions = res.data

      if (competitions?.length > 0) {
        const images = competitions.map(c => c.image.formats.small.url)
        setImages(images)
      }
    }

    fetchImages()
  }, [])

  return (
    <Container maxW='xl'>
      <SimpleGrid gap={4} flex={1}>
        {images?.map(image => (
          <Image boxSize='150px' key={image} src={image} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Test
