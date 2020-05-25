import React, { Fragment, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collection from './Collection'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const SearchCollections = props => {
  const [keyword, setKeyword] = useState('')
  const [collection, setCollection] = useState([])
  const [searched, setSearched] = useState(false)

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
        setSearched(true)
      })
      .then(() => msgAlert({
        heading: 'Search Completed Successfully',
        message: 'Results are listed',
        variant: 'primary'
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
        console.log(res, 'random')
        setCollection(res.data.photos)
        setSearched(false)
      })
      .then(() => msgAlert({
        heading: 'Request Success',
        message: 'Random photo is showed',
        variant: 'primary'
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
      <h3 style={{ padding: '1em', textAlign: 'center' }}>Which collection would you like to discover today?</h3>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirecton: 'column' }}>
          <Form.Control style={{ textAlign: 'center', maxWidth: '50em' }} type="text" name="keyword" placeholder="Keyword" value={keyword}
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
  if (collection.length > 0) {
    return (
      <div className="align-items-center">
        {searchJsx}
        {collectionsJsx}
      </div>
    )
  } else if (searched) {
    return (
      <div className="align-items-center">
        {searchJsx}
        <h5> There are no collections related to that keyword. Please try with another one!</h5>
      </div>
    )
  }

  return (
    searchJsx
  )
}

export default SearchCollections
