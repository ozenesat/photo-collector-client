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
  const [relatedCollections, setRelatedCollections] = useState([])
  const [related, setRelated] = useState(false)
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
        setRelatedCollections(res.data.photos)
        setRelated(true)
        setDiscoverd(false)
      })
      .catch(console.err)
  }

  // Search results in boxes
  const resultJsx = (
    <Fragment>
      <Card style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
        <Card.Img variant="bottom" src={coverPhotoUrl} />
        <Card.Body>
          <Col lg="12" className="text-center">
            <a href={collectionLink} rel="noreferrer noopener" target="_blank">
              {title}
            </a>
            <hr />
            {description}
          </Col>
          <Button variant="outline-primary" onClick={handleClick}>Collection Photos</Button>
          <Button variant="outline-success" onClick={relatedClick}>Related Collections</Button>
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
        download={photo.links.download}
        user={user}
      />
    ))
    return (
      photosJsx
    )
  }

  if (related) {
    const relatedJsx = (relatedCollections.map(collection => (
      <Fragment key={collection.id}>
        <Card style={{ width: '75%', margin: 'auto', textAlign: 'center' }}>
          <Card.Img variant="bottom" src={collection.cover_photo.urls.regular} />
          <Card.Body>
            <Col lg="12" className="text-center">
              <a href={collection.links.html} rel="noreferrer noopener" target="_blank">
                {collection.title}
              </a>
              <hr />
              {collection.description}
            </Col>
            <Button variant="outline-primary" onClick={handleClick}>Collection Photos</Button>
            <p>Related with <a href={collectionLink} rel="noreferrer noopener" target="_blank">
              {title}
            </a> collection</p>
          </Card.Body>
        </Card>
      </Fragment>
    )))
    return (
      relatedJsx
    )
  }
  return (
    resultJsx
  )
}

export default Collection
