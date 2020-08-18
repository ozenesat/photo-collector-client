import React, { Fragment, useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router'
import CollectedPhoto from './CollectedPhoto'

const Photos = props => {
  const [photos, setPhotos] = useState([])
  const [keyword, setKeyword] = useState('')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState('')
  const msgAlert = props.msgAlert

  // Update the keyword for search in my photo collection page
  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  // Bring the results of search in my photo collection page
  const handleSubmit = event => {
    event.preventDefault()
    setResults(photos.filter(photo => photo.title.toLowerCase().includes(keyword.toLowerCase())))
    setKeyword('')
    if (searched) {
      setSearched(false)
    } else {
      setSearched(true)
    }
  }

  // Retrieve all collected photos
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
        variant: 'primary'
      }))
      .catch(error => {
        setKeyword('')
        msgAlert({
          heading: 'Failed. You may need to sign-in again.',
          message: error.message,
          variant: 'danger'
        })
      })
  }, [])

  // Show only the signed-in user's collected photos
  const user = props.user
  const id = user._id
  let userPhotos
  const searchBarJsx = (
    <div>
      <h3 style={{ marginTop: '2em', padding: '1em', textAlign: 'center' }}>My Photos</h3>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirecton: 'column' }}>
          <Form.Control style={{ textAlign: 'center', maxWidth: '50em' }} type="text" name="keyword" value={keyword} placeholder="Enter any word from the photo title"
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="outline-info" type="submit">
          Search
        </Button>
      </Form>
      <hr/>
    </div>
  )
  if (photos && !searched) {
    userPhotos = photos.filter(photo => photo.owner === id)
    const photosJsx = userPhotos.map(photo => (
      <Fragment key={photo.photoId}>
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
        {searchBarJsx}
        {photosJsx}
      </div>
    )
  }

  if (searched) {
    userPhotos = results.filter(photo => photo.owner === id)
    if (userPhotos.length > 0) {
      const photosJsx = userPhotos.map(photo => (
        <Fragment key={photo.photoId}>
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
          {searchBarJsx}
          {photosJsx}
          <div style={{ textAlign: 'center', margin: '0.75em' }}>
            <Button onClick={handleSubmit} variant="outline-success">Back to Collection</Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="align-items-center">
          {searchBarJsx}
          <h5> There is no photos related with this title yet!</h5>
          <div style={{ textAlign: 'center', margin: '0.75em' }}>
            <Button onClick={handleSubmit} variant="outline-success">Back to Collection</Button>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(Photos)
