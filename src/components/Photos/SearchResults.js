import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import PhotoForm from './PhotoForm'
// import { Link } from 'react-router-dom'

const SearchResults = ({ title, photoId, photoUrl, photographer, portfolio, user }) => {
  const [collected, setCollected] = useState(false)

  // Update the collection status of photo with user's input
  const handleClick = event => {
    event.preventDefault()
    setCollected(true)
  }

  // Send the photo into review form when user choose to collect it
  const photoJsx = (
    <Fragment>
      <PhotoForm
        key={photoId}
        title={title}
        photoId={photoId}
        photoUrl= {photoUrl}
        photographer= {photographer}
        portfolio= {portfolio}
        user= {user}
      />
    </Fragment>
  )

  // Search results in boxes
  const resultJsx = (
    <Fragment>
      <Card style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
        <Card.Img variant="top" src={photoUrl} />
        <Card.Body>
          <Col lg="12" className="text-center">
            {title}
            <hr />
            <a href={portfolio} rel="noreferrer noopener" target="_blank">
              By {photographer}
            </a>
          </Col>
          <Button variant="outline-primary" onClick={handleClick}>Collect it!</Button>
          {'  '}
          <Button rel="noreferrer noopener" target="_blank" href={photoUrl} variant="outline-success">
            Discover it!
          </Button>
        </Card.Body>
      </Card>
    </Fragment>
  )

  // if user would like to collect photo, returns photo review form
  if (collected) {
    return (
      photoJsx
    )
  }
  return (
    resultJsx
  )
}

export default SearchResults
