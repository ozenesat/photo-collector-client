import React, { Fragment, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'
// import Layout from '../Shared/Layout'

const Search = props => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/search`,
      method: 'GET',
      params: {
        query: keyword
      }
    })
      .then(res => {
        console.log(res)
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
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  }
  const photoJsx = (
    <Fragment>
      <h1>Search Photos</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="keyword">
          <Form.Label>Keyword</Form.Label>
          <Form.Control type="text" name="query" placeholder="Enter a Keyword"
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Button variant="primary" type="click" onClick={handleClick}>
      Get Random
      </Button>
    </Fragment>
  )

  return (
    photoJsx
  )
}

export default Search
