import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import CollectedPhoto from './CollectedPhoto'
import { Link } from 'react-router-dom'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'

const PhotoForm = ({ title, photoId, photoUrl, photographer, portfolio, user }) => {
  const [submitted, setSubmitted] = useState(false)
  const [userReview, setUserReview] = useState({ rating: '', comment: '' })

  const handleChange = event => {
    event.persist()
    setUserReview(review => ({ ...userReview, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/photos`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        photo: {
          rating: userReview.rating,
          comment: userReview.comment,
          photoUrl,
          photographer,
          portfolio,
          title,
          photoId
        }
      }
    })
      .then(setSubmitted(true))
      .catch(console.error)
  }

  const photoJsx = (
    <Card style={{ width: '65%', margin: 'auto' }}>
      <Card.Img variant="bottom" src={photoUrl} />
      <Card.Body>
        <Col lg="12" className="text-center">
          {title}
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control required as="select" name="rating" onChange={handleChange} value={userReview.rating}>
                <option> </option>
                <option>🌟</option>
                <option>⭐🌟</option>
                <option>⭐⭐🌟</option>
                <option>⭐⭐⭐🌟</option>
                <option>⭐⭐⭐⭐🌟</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows="3" name="comment" onChange={handleChange} value={userReview.comment}/>
            </Form.Group>
            <Button variant="outline-success" type="submit">Add to My Photo Collection!</Button>
          </Form>
        </Col>
      </Card.Body>
    </Card>
  )

  const collectedPhotoJsx = (
    <Card style={{ width: '65%', margin: 'auto', textAlign: 'center' }}>
      <a rel="noreferrer noopener" target="_blank" href={photoUrl}>
        <Card.Img src={photoUrl}/> </a>
      <Card.Body>
        <Col lg="12" className="text-center">
          <h3>{title}</h3>
          <a href={portfolio} rel="noreferrer noopener" target="_blank">
            By {photographer}
          </a>
          <hr />
          <h3> {userReview.comment} </h3>
          <h4> {userReview.rating} </h4>
        </Col>
        <Link to={'/photos'}>
          <Button variant="outline-success"> {''}My Photo Collection </Button>
        </Link>
      </Card.Body>
    </Card>
  )

  if (submitted) {
    return (
      <div>
        <AutoDismissAlert
          key= '1'
          heading='Successfully'
          message='Photo added to your collection!'
          variant='success'
        />
        {collectedPhotoJsx}
      </div>
    )
  }
  return (
    <Fragment>
      {photoJsx}
    </Fragment>
  )
}

export default PhotoForm
