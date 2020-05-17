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
  const [searched, setSearched] = useState(false)
  const user = props.user
  const msgAlert = props.msgAlert

  // update the keyword with user's input
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
        setSearched(true)
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

  // Shows the result of search
  const photosJsx = searchResult.map(photo => (
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
        setSearched(false)
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
      <h3 style={{ textAlign: 'center', fontFamily: 'Permanent Marker, cursive' }}>What would you like to search today?</h3>
      <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword">
          <Form.Control style={{ textAlign: 'center' }} type="text" name="keyword" placeholder="Keyword" value={keyword}
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

  // Returns the photo from random search with search bar after random photo requested
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
          download={photo.links.download}
          user={user}
        />
      </div>

    )
  }

  // Returns the search results with search bar after search requested
  if (searchResult.length > 0) {
    return (
      <div className="align-items-center">
        {searchJsx}
        {photosJsx}
      </div>
    )
  } else if (searched) {
    return (
      <div className="align-items-center">
        {searchJsx}
        <h5> There are no photos related to that keyword. Please try with another one!</h5>
      </div>
    )
  }

  return (
    searchJsx
  )
}

export default Search
