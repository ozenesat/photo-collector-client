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

  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log(keyword)
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
      .catch(console.error)
  }, [])
  const user = props.user

  // const photosJsx = (
  //   <div>
  //     <h1>My Photo Collection</h1>
  //     <ul>
  //       {photos.map(photo => (
  //         <Link to={`/photos/${photo._id}`} key={photo._id}>
  //           <li key={photo._id}>
  //             {photo.title}
  //           </li>
  //         </Link>
  //       ))}
  //     </ul>
  //   </div>
  // )
  // console.log(photos, 'PHOTO')
  const photosJsx = photos.map(photo => (
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
          <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Enter the Photo Title"
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

export default withRouter(Photos)
