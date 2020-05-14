import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CollectedPhoto = ({ title, photoId, photoUrl, photographer, portfolio, rating, comment, user, id }) => {
  const [deleted, setDeleted] = useState(false)
  const destroy = () => {
    axios({
      url: `${apiUrl}/photos/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  const returnJsx = (
    <Card style={{ width: '65%', margin: 'auto' }}>
      <a rel="noreferrer noopener" target="_blank" href={photoUrl}>
        <Card.Img src={photoUrl}/> </a>
      <Card.Body>
        <Card.Text>
          <h3>{title}</h3>
          <a href={portfolio} rel="noreferrer noopener" target="_blank">
            By {photographer}
          </a>
          <hr />
          <h3> {comment} </h3>
          <h4> {rating} </h4>
        </Card.Text>
        <Button className="icon-pencil"variant="outline-warning"> {''}Edit </Button>
        {' '}
        <Button className="icon-close" variant="outline-danger" onClick={destroy}> {' '} Delete </Button>
      </Card.Body>
    </Card>
  )
  if (deleted) {
    return <Redirect to={
      { pathname: '/photos' }
    } />
  }

  return (
    returnJsx
  )
}

export default CollectedPhoto
