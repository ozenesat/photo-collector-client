import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const PhotoUpdate = (props) => {
  const [photo, setPhoto] = useState(null)
  const [userReview, setUserReview] = useState({ rating: '', comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const msgAlert = props.msgAlert
  // Bring the selected photo and user review to update it
  const user = props.user
  useEffect(() => {
    axios({
      url: `${apiUrl}/photos/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => {
        setPhoto(res.data.photo)
        setUserReview({ rating: res.data.photo.rating, comment: res.data.photo.comment })
      })
      .catch(console.error)
  }, [])

  // Update the rating and comment with user's input
  const handleChange = event => {
    event.persist()
    setUserReview(review => ({ ...userReview, [event.target.name]: event.target.value }))
  }

  //  Update user's review of photo at photo collection
  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/photos/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        photo: {
          rating: userReview.rating,
          comment: userReview.comment
        }
      }
    })
      .then(setSubmitted(true))
      .then(() => msgAlert({
        heading: 'Successfully',
        message: 'Collection is updated!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Error on update',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  // Update photo review box with the updated review and a return botton to photo collection
  let collectedPhotoJsx
  if (photo) {
    collectedPhotoJsx = (
      <Card style={{ width: '65%', margin: 'auto', textAlign: 'center' }}>
        <a rel="noreferrer noopener" target="_blank" href={photo.photoUrl}>
          <Card.Img src={photo.photoUrl}/> </a>
        <Card.Body>
          <Col lg="12" className="text-center">
            <h3>{photo.title}</h3>
            <a href={photo.portfolio} rel="noreferrer noopener" target="_blank">
            By {photo.photographer}
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
  }

  // if the requested photo is not loaded yet just run `loading`
  if (!photo) {
    return (
      <p>Loading...</p>
    )
  }

  // After user submit updated reviews just return the photo with updated info
  if (submitted) {
    return (
      collectedPhotoJsx
    )
  }
  return (
    <Card style={{ width: '65%', margin: 'auto', textAlign: 'center' }}>
      <Card.Img variant="bottom" src={photo.photoUrl} />
      <Card.Body>
        <Col lg="12" className="text-center">
          {photo.title}
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
            <Button variant="outline-success" type="submit">Submit!</Button>
          </Form>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default withRouter(PhotoUpdate)
