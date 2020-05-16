import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import PhotoForm from './PhotoForm'
// import { Link } from 'react-router-dom'

const Collection = ({ photoUrl, title }) => {
  // Search results in boxes
  const resultJsx = (
    <Fragment>
      <Card style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
        <Card.Img variant="top" src={photoUrl} />
        <Card.Body>
          <Col lg="12" className="text-center">
            {title}
          </Col>
        </Card.Body>
      </Card>
    </Fragment>
  )

  return (
    resultJsx
  )
}

export default Collection
