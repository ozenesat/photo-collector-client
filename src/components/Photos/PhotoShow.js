import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router'
import CollectedPhoto from './CollectedPhoto'

const ShowPhoto = (props) => {
  console.log(props)
  const [photo, setPhoto] = useState(null)
  const user = props.user
  useEffect(() => {
    axios({
      url: `${apiUrl}/photos/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setPhoto(res.data.photo))
      .catch(console.error)
  }, [])

  if (!photo) {
    return <p>Loading...</p>
  }

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
      user= {user}
    />
  )
}

export default withRouter(ShowPhoto)
