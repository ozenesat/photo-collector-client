import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'

const SearchResults = ({ title, photoId, photoUrl, photographer, portfolio }) => (
  <div>
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={photoUrl} />
      <Card.Body>
        <Card.Text>
          {title}
          <hr />
          <a href={portfolio}>
              By {photographer}
          </a>
        </Card.Text>
        <Button variant="outline-primary">Collect it!</Button>
        {'  '}
        <Button href={photoUrl} variant="outline-warning">
            Discover it!
        </Button>
      </Card.Body>
    </Card>
  </div>
)

export default SearchResults
