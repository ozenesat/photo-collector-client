import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CollectedPhoto from './CollectedPhoto'

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
      .then(res => console.log('submitted!', res))
      .then(setSubmitted(true))
      .catch(console.error)
  }

  // const [photo, setPhoto] = useState(null)
  const photoJsx = (
    <Card style={{ width: '55%', margin: 'auto' }}>
      <Card.Img variant="bottom" src={photoUrl} />
      <Card.Body>
        <Card.Text>
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
              <Form.Control required as="textarea" rows="3" name="comment" onChange={handleChange} value={userReview.comment}/>
            </Form.Group>
            <Button variant="outline-success" type="submit">Add to My Photo Collection!</Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  )

  const collectedPhotoJsx = (
    <CollectedPhoto
      key={photoId}
      title={title}
      photoId={photoId}
      photoUrl= {photoUrl}
      photographer= {photographer}
      portfolio= {portfolio}
      user= {user}
    />
  )

  if (submitted) {
    return (
      <Fragment>
        {collectedPhotoJsx}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {photoJsx}
    </Fragment>
  )
}

export default PhotoForm
