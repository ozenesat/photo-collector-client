import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Home = () => {
  const [photos, setPhotos] = useState(null)
  const [contoroller, setController] = useState(false)
  if (!contoroller) {
    axios({
      url: `${apiUrl}/random-home`,
      method: 'GET'
    })
      .then(res => {
        setPhotos(res.data.photos)
        setController(true)
      })
      .catch(console.error)
  }

  if (contoroller) {
    const photosJsx = (
      <Carousel>
        <Carousel.Item>
          <img
            style={{ objectFit: 'cover',
              backgroundPosition: 'center',
              height: '100vh' }}
            className="d-block w-100"
            src={photos[0].urls.regular}
            alt="First slide"
          />
          <Carousel.Caption style={{ background: 'linear-gradient(0deg, rgba(36,58,111,0.5) 0%, rgba(36,58,111,0.77) 50%, rgba(36,58,111,0.5) 100%)' }}>
            <h3>A Photo by {photos[0].user.name}. Sign in to add it in your collection</h3>
            <p>{photos[0].alt_description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ objectFit: 'cover',
              backgroundPosition: 'center',
              height: '100vh' }}
            className="d-block w-100"
            src={photos[1].urls.regular}
            alt="Second slide"
          />
          <Carousel.Caption style={{ background: 'linear-gradient(0deg, rgba(36,58,111,0.5) 0%, rgba(36,58,111,0.77) 50%, rgba(36,58,111,0.5) 100%)' }}>
            <h3>A Photo by {photos[1].user.name}. Sign in to add it in your collection</h3>
            <p>{photos[1].alt_description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ objectFit: 'cover',
              backgroundPosition: 'center',
              height: '100vh' }}
            className="d-block w-100"
            src={photos[2].urls.regular}
            alt="Third slide"
          />

          <Carousel.Caption style={{ background: 'linear-gradient(0deg, rgba(36,58,111,0.5) 0%, rgba(36,58,111,0.77) 50%, rgba(36,58,111,0.5) 100%)' }}>
            <h3>A Photo by {photos[2].user.name}. Sign in to add it in your collection</h3>
            <p>{photos[2].alt_description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
    return (
      photosJsx
    )
  }

  return (
    <div>
      <h1> Welcome to Photo Collector</h1>
      <p>Loading...</p>
    </div>
  )
}

export default Home
