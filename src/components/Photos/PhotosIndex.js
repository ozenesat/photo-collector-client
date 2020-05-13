import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Photos = props => {
  const [photos, setPhotos] = useState([])
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
  const photoJsx = (
    <div>
      <h1>My Photo Collection</h1>
      <ul>
        {photos.map(photo => (
          <Link to={`/photos/${photo._id}`} key={photo._id}>
            <li key={photo._id}>
              {photo.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )

  return (
    photoJsx
  )
}

export default Photos
