import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router'
import CollectedPhoto from './CollectedPhoto'

const ShowPhoto = (props) => {
  const [photo, setPhoto] = useState(null)
  const user = props.user
  const msgAlert = props.msgAlert

  // Retrieve requested photo
  useEffect(() => {
    axios({
      url: `${apiUrl}/photos/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setPhoto(res.data.photo))
      .then(() => msgAlert({
        heading: 'Successfully',
        message: 'Photo listed',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed on listing',
          message: error.message,
          variant: 'danger'
        })
      })
  }, [])

  // If photo is not loaded yet just run `loading`
  if (!photo) {
    return <p>Loading...</p>
  }

  // Return the requested photo with form box
  return (
    <CollectedPhoto
      key={photo.photoId}
      title={photo.title}
      photoId={photo.photoId}
      photoUrl= {photo.photoUrl}
      photographer= {photo.photographer}
      portfolio= {photo.portfolio}
      rating= {photo.rating}
      comment= {photo.comment}
      id={photo._id}
      user= {user}
    />
  )
}

export default withRouter(ShowPhoto)
