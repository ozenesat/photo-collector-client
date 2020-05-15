import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router'
import CollectedPhoto from './CollectedPhoto'

const Photos = props => {
  const [photos, setPhotos] = useState([])
  const [keyword, setKeyword] = useState('')
  const msgAlert = props.msgAlert
  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setPhotos(photos.filter(photo => photo.title.includes(keyword)))
    setKeyword('')
  }

  useEffect((user) => {
    axios({
      url: `${apiUrl}/photos`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setPhotos(res.data.photos)
      })
      .then(() => msgAlert({
        heading: 'Successfully',
        message: 'Photos are listed',
        variant: 'success'
      }))
      .catch(error => {
        setKeyword('')
        msgAlert({
          heading: 'Failed on listing',
          message: error.message,
          variant: 'danger'
        })
      })
  }, [])
  const user = props.user
  const id = user._id
  let userPhotos
  if (photos) {
    userPhotos = photos.filter(photo => photo.owner === id)
    const photosJsx = userPhotos.map(photo => (
      <Fragment key={photo.photoId}>
        <Link to={`/photos/${photo._id}`} key={photo._id}>
          <h3 style={{ textAlign: 'center' }}>
            ~
          </h3>
        </Link>
        <CollectedPhoto
          title={photo.title}
          photoId={photo.photoId}
          photoUrl= {photo.photoUrl}
          photographer={photo.photographer}
          portfolio={photo.portfolio}
          rating= {photo.rating}
          comment= {photo.comment}
          user={user}
          id={photo._id}
        />
      </Fragment>
    ))
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Permanent Marker, cursive' }}>My Photos</h1>
        <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="keyword">
            <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Enter any word from the photo title"
              onChange={handleChange}/>
          </Form.Group>
          <Button variant="outline-info" type="submit">
            Search
          </Button>
        </Form>
        {photosJsx}
      </div>
    )
  }
}

export default withRouter(Photos)
