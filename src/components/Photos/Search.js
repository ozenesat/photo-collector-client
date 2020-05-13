import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SearchResults from './SearchResults'

import apiUrl from '../../apiConfig'
// import Layout from '../Shared/Layout'

const Search = props => {
  const [keyword, setKeyword] = useState('')
  const [photo, setPhoto] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  // Get photos from unsplash with a keyword which is entered by user
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/search`,
      method: 'GET',
      params: { keyword }
    })
      .then(res => {
        setSearchResult(res.data.photos.results)
        setKeyword('')
        setPhoto('')
      })
      .catch(console.error)
  }
  // console.log(searchResult, ' XXX')
  const photosJsx = searchResult.map(photo => (
    <SearchResults
      key={photo.id}
      title={photo.alt_description}
      photoId={photo.id}
      photoUrl= {photo.urls.regular}
      photographer={photo.user.name}
      portfolio={photo.user.links.html}
    />
  ))

  // get a random photo from unsplash
  const handleClick = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/random`,
      method: 'GET'
    })
      .then(res => {
        setPhoto(res.data.photos[0])
        setSearchResult([])
      })
      .catch(console.error)
  }

  const photoJsx = (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}>Search Photos</h1>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword">
          <Form.Label>What would you like to collect today?</Form.Label>
          <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Keyword"
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Search
        </Button>
        {'  '}
        <Button variant="outline-primary" type="click" onClick={handleClick}>
        Get Random
        </Button>
        <hr />
      </Form>
    </Fragment>
  )

  if (photo) {
    return (
      <div>
        {photoJsx}
        <SearchResults
          key={photo.id}
          title={photo.alt_description}
          photoId={photo.id}
          photoUrl= {photo.urls.regular}
          photographer={photo.user.name}
          portfolio={photo.user.links.html}
        />
      </div>

    )
  } if (searchResult) {
    return (
      <div className="align-items-center">
        {photoJsx}
        {photosJsx}
      </div>
    )
  } else {
    return (
      photoJsx
    )
  }
}

export default Search
