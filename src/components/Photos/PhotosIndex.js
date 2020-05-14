import React, { Fragment, useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router'
import CollectedPhoto from './CollectedPhoto'

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
  const photosJsx = photos.map(photo => (
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
      />
    </Fragment>
  ))

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Permanent Marker, cursive' }}>My Photos</h1>
      {photosJsx}
    </div>
  )
}

export default withRouter(Photos)
