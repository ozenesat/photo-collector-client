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

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/search`,
      method: 'GET',
      params: { keyword }
    })
      .then(res => {
        setPhoto(res.data)
        setKeyword('')
      })
      .catch(console.error)
  }

  const handleChange = event => {
    event.persist()
    setKeyword(event.target.value)
  }

  const handleClick = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/random`,
      method: 'GET'
    })
      .then(res => {
        console.log(res.data.photos[0])
        setPhoto(res.data.photos[0])
      })
      .catch(console.error)
  }

  const photoJsx = (
    <Fragment>
      <h1>Search Photos</h1>
      <Form onSubmit={handleSubmit} className="text-align-center">
        <Form.Group size="lg" controlId="keyword">
          <Form.Label>Keyword</Form.Label>
          <Form.Control type="text" name="query" placeholder="Enter a Keyword"
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Search
        </Button>
        {'  '}
        <Button variant="outline-primary" type="click" onClick={handleClick}>
        Get Random
        </Button>
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
  } else {
    return (
      photoJsx
    )
  }
}

export default Search
