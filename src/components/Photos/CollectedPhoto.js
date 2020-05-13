import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CollectedPhoto = ({ title, photoId, photoUrl, photographer, portfolio, user }) => {
  const returnJsx = (
    <Card style={{ width: '55%', margin: 'auto' }}>
      <Card.Img variant="bottom" src={photoUrl} />
      <Card.Body>
        <Card.Text>
          {title}
          <hr />
          <a href={portfolio} rel="noreferrer noopener" target="_blank">
            By {photographer}
          </a>
        </Card.Text>
        <Button className="icon-pencil"variant="outline-warning"> {''}Edit </Button>
        {' '}
        <Button className="icon-close" variant="outline-danger"> {' '} Delete </Button>
      </Card.Body>
    </Card>
  )
  return (
    returnJsx
  )
}

export default CollectedPhoto
