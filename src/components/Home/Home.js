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
        console.log(res.data.photos[0], 'photos - 0')
        setController(true)
      })
      .catch(console.error)
  }

  console.log(photos, 'P')
  if (contoroller) {
    const photosJsx = (
      <Carousel style={{ display: 'flex', justifyContent: 'center', objectFit: 'contain' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${photos[0].urls.regular}&w=1500&dpr=2`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={photos[1].urls.raw + '&w=1500&dpr=2'}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${photos[2].urls.regular}&w=1500&dpr=2`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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
      {console.log(photos, 'PPP')}
    </div>
  )
}

export default Home
