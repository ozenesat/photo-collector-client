import React, { Fragment, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PhotoForm from '../Photos/PhotoForm'

// Home page for signed-in users with random photos which they can collect
const Home = (props) => {
  const user = props.user
  const [photos, setPhotos] = useState(null)
  const [controller, setController] = useState(false)
  const [collected0, setCollected0] = useState(false)
  const [collected1, setCollected1] = useState(false)
  const [collected2, setCollected2] = useState(false)

  const handleClick0 = event => {
    event.preventDefault()
    setCollected0(true)
  }

  if (collected0) {
    const photoJsx0 = (
      <Fragment>
        <PhotoForm
          key={photos[0].id}
          title={photos[0].alt_description}
          photoId={photos[0].id}
          photoUrl= {photos[0].urls.regular}
          photographer= {photos[0].user.name}
          portfolio= {photos[0].user.links.html}
          user= {props.user}
        />
      </Fragment>
    )
    return (
      photoJsx0
    )
  }
  const handleClick1 = event => {
    event.preventDefault()
    setCollected1(true)
  }

  if (collected1) {
    const photoJsx1 = (
      <Fragment>
        <PhotoForm
          key={photos[1].id}
          title={photos[1].alt_description}
          photoId={photos[1].id}
          photoUrl= {photos[1].urls.regular}
          photographer= {photos[1].user.name}
          portfolio= {photos[1].user.links.html}
          user= {props.user}
        />
      </Fragment>
    )
    return (
      photoJsx1
    )
  }
  const handleClick2 = event => {
    event.preventDefault()
    setCollected2(true)
  }

  if (collected2) {
    const photoJsx2 = (
      <Fragment>
        <PhotoForm
          key={photos[2].id}
          title={photos[2].alt_description}
          photoId={photos[2].id}
          photoUrl= {photos[2].urls.regular}
          photographer= {photos[2].user.name}
          portfolio= {photos[2].user.links.html}
          user= {props.user}
        />
      </Fragment>
    )

    return (
      photoJsx2
    )
  }

  if (!controller) {
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

  if (controller && user) {
    const photosJsx = (
      <Carousel style={{ justifyContent: 'center', textAlign: 'center' }}>
        <Carousel.Item>
          <img
            style={{ objectFit: 'cover',
              backgroundPosition: 'center',
              height: '100vh' }}
            className="d-block w-100"
            src={photos[0].urls.regular}
            alt="First slide"
          />
          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3 type="submit" onClick={handleClick0}>A Photo by {photos[0].user.name}. Add it to your collection</h3>
            <h4>{photos[0].alt_description}</h4>
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
          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3 type="submit" onClick={handleClick1}>A Photo by {photos[1].user.name}. Add it to your collection</h3>
            <h4>{photos[1].alt_description}</h4>
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

          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3 type="submit" onClick={handleClick2}>A Photo by {photos[2].user.name}. Add it to your collection</h3>
            <h4>{photos[2].alt_description}</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
    return (
      photosJsx
    )
  } else if (controller) {
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
          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3>A Photo by {photos[0].user.name}. Sign in to add it in your collection</h3>
            <h4>{photos[0].alt_description}</h4>
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
          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3>A Photo by {photos[1].user.name}. Sign in to add it in your collection</h3>
            <h4>{photos[1].alt_description}</h4>
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

          <Carousel.Caption style={{ fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
            <h3>A Photo by {photos[2].user.name}. Sign in to add it in your collection</h3>
            <h4>{photos[2].alt_description}</h4>
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
      <h4>Loading...</h4>
    </div>
  )
}

export default Home
