import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SearchResults from './SearchResults'
import apiUrl from '../../apiConfig'

const Search = props => {
  const [keyword, setKeyword] = useState('')
  const [photo, setPhoto] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const user = props.user
  const msgAlert = props.msgAlert

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
  // console.log(searchResult, ' XXX')
  const photosJsx = searchResult.map(photo => (
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

  const searchJsx = (
    <Fragment>
      <h3 style={{ textAlign: 'center', fontFamily: 'Permanent Marker, cursive' }}>What would you like to search today?</h3>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword">
          <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Keyword"
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="outline-info" type="submit">
          Search
        </Button>
        {'  '}
        <Button variant="outline-info" type="click" onClick={handleClick}>
        Get Random
        </Button>
        <hr />
      </Form>
    </Fragment>
  )

  if (photo) {
    return (
      <div>
        {searchJsx}
        <SearchResults
          key={photo.id}
          title={photo.alt_description}
          photoId={photo.id}
          photoUrl= {photo.urls.regular}
          photographer={photo.user.name}
          portfolio={photo.user.links.html}
          user={user}
        />
      </div>

    )
  }

  if (searchResult) {
    return (
      <div className="align-items-center">
        {searchJsx}
        {photosJsx}
      </div>
    )
  }

  return (
    searchJsx
  )
}

export default Search
