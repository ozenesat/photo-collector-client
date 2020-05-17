import React, { Fragment, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import PhotoForm from './PhotoForm'
import SearchResults from './SearchResults'
// import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Collection = ({ title, collectionId, coverPhotoUrl, description, collectionLink, user }) => {
  const [discovered, setDiscoverd] = useState(false)
  const [photos, setPhotos] = useState([])
  // const [relatedCollections, setRelatedCollections] = ([])

  // Update the collection status of photo with user's input
  const handleClick = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/collection-photos`,
      method: 'GET',
      params: { collectionId }
    })
      .then(res => {
        setPhotos(res.data.photos)
        // console.log(res.data, 'RES')
        setDiscoverd(true)
      })
      .catch(console.err)
  }

  // Get the related collection of current collection
  const relatedClick = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/collection-related`,
      method: 'GET',
      params: { collectionId }
    })
      .then(res => {
        console.log(res.data, 'REL')
        setDiscoverd(false)
      })
      .catch(console.err)
  }

  // Search results in boxes
  const resultJsx = (
    <Fragment>
      <Card style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
        <Card.Img variant="top" src={coverPhotoUrl} />
        <Card.Body>
          <Col lg="12" className="text-center">
            <a href={collectionLink} rel="noreferrer noopener" target="_blank">
              {title}
            </a>
            <hr />
            {description}
          </Col>
          <Button variant="outline-primary" onClick={handleClick}>Collection Photos</Button>
          <Button variant="outline-primary" onClick={relatedClick}>Related Collection</Button>
        </Card.Body>
      </Card>
    </Fragment>
  )

  // if user would like to collect photo, returns photo review form
  if (discovered) {
    const photosJsx = photos.map(photo => (
      <SearchResults
        key={photo.id}
        title={photo.alt_description}
        photoId={photo.id}
        photoUrl= {photo.urls.regular}
        photographer={photo.user.name}
        portfolio={photo.user.links.html}
        user={user}
      />
    ))
    return (
      photosJsx
    )
  }
  return (
    resultJsx
  )
}

export default Collection
