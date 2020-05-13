import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import PhotoForm from './PhotoForm'
// import { Link } from 'react-router-dom'

const SearchResults = ({ title, photoId, photoUrl, photographer, portfolio, user }) => {
  const [collected, setCollected] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setCollected(true)
  }
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

  const resultJsx = (
    <Fragment>
      <Card style={{ width: '55%', margin: 'auto' }}>
        <Card.Img variant="top" src={photoUrl} />
        <Card.Body>
          <Card.Text>
            {title}
            <hr />
            <a href={portfolio} rel="noreferrer noopener" target="_blank">
              By {photographer}
            </a>
          </Card.Text>
          <Button variant="outline-primary" onClick={handleClick}>Collect it!</Button>
          {'  '}
          <Button rel="noreferrer noopener" target="_blank" href={photoUrl} variant="outline-success">
            Discover it!
          </Button>
        </Card.Body>
      </Card>
    </Fragment>
  )
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
