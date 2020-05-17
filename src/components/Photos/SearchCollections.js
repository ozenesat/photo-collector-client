import React, { Fragment, useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collection from './Collection'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const SearchCollections = props => {
  const [keyword, setKeyword] = useState('')
  const [collection, setCollection] = useState([])

  const user = props.user
  const msgAlert = props.msgAlert

  // update the keyword with user's input
  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  // Get collections from unsplash with a keyword which is entered by user
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/collections`,
      method: 'GET',
      params: { keyword }
    })
      .then(res => {
        setCollection(res.data.photos.results)
        setKeyword('')
      })
      .then(() => msgAlert({
        heading: 'Search Completed Successfully',
        message: 'Results are listed',
        variant: 'success'
      }))
      .catch(error => {
        setKeyword('')
        msgAlert({
          heading: 'Search Failed',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  // Shows the result of search
  const collectionsJsx = collection.map(collection => (
    <Collection
      key={collection.id}
      description={collection.description}
      collectionId={collection.id}
      coverPhotoUrl= {collection.cover_photo.urls.regular}
      title={collection.title}
      collectionLink={collection.links.html}
      photos={collection.preview_photos}
      user = {user}
    />
  ))

  // get a random collection from unsplash
  const handleClick = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/collection`,
      method: 'GET'
    })
      .then(res => {
        setCollection(res.data.photos)
      })
      .then(() => msgAlert({
        heading: 'Request Success',
        message: 'Random photo is showed',
        variant: 'success'
      }))
      .catch(error => {
        setKeyword('')
        msgAlert({
          heading: 'Search Failed',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  // Search Bar
  const searchJsx = (
    <Fragment>
      <h3 style={{ textAlign: 'center', fontFamily: 'Permanent Marker, cursive' }}>Which collection would you like to discover today?</h3>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword">
          <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Keyword" value={keyword}
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="outline-info" type="submit">
          Search Collection
        </Button>
        {'  '}
        <Button variant="outline-info" type="click" onClick={handleClick}>
          Featured Collections
        </Button>
        <hr />
      </Form>
    </Fragment>
  )

  // Returns the photo from random search with search bar after random photo requested
  if (collection) {
    return (
      <div className="align-items-center">
        {searchJsx}
        {collectionsJsx}
      </div>
    )
  }

  // Returns the search results with search bar after search requested

  return (
    <div className="align-items-center">
      {searchJsx}
    </div>
  )
}

export default SearchCollections
