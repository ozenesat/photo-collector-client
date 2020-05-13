import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Photo from './PhotoShow'
// import { Link } from 'react-router-dom'

const SearchResults = ({ title, photoId, photoUrl, photographer, portfolio }) => {
  const [collected, setCollected] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setCollected(true)
  }
  const photoJsx = (
    <Photo
      key={photoId}
      title={title}
      photoId={photoId}
      photoUrl= {photoUrl}
    />
  )

  const resultJsx = (
    <div>
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
          <Button variant="outline-primary" onClick={handleClick}
            title={title}
            photoId={photoId}
            photoUrl= {photoUrl}>Collect it!</Button>
          {'  '}
          <Button rel="noreferrer noopener" target="_blank" href={photoUrl} variant="outline-success">
            Discover it!
          </Button>
        </Card.Body>
      </Card>
    </div>
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
