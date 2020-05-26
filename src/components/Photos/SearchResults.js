import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import PhotoForm from './PhotoForm'
// import { Link } from 'react-router-dom'

const SearchResults = ({ title, photoId, photoUrl, photographer, portfolio, user, download, related }) => {
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
      <Card style={{ width: '60%', margin: 'auto', textAlign: 'center', padding: '1em', border: '0.2em outset', marginBottom: '1em' }}>
        <a href={photoUrl} rel="noreferrer noopener" target="_blank">
          <Card.Img variant="bottom" src={photoUrl} />
        </a>
        <Card.Body>
          <Col lg="12" className="text-center">
            {title}
            <hr />
            By  {' '}
            <a href={portfolio} rel="noreferrer noopener" target="_blank">
              {photographer}
            </a>
            {' '}  on  {' '}
            <a href="https://unsplash.com/" rel="noreferrer noopener" target="_blank">
              Unsplash
            </a>
          </Col>
          <Button variant="outline-primary" onClick={handleClick}>Collect it!</Button>
          {'  '}
          <Button rel="noreferrer noopener" target="_blank" href={download} variant="outline-success">
            Download it!
          </Button>
          <h5>{related}</h5>
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
