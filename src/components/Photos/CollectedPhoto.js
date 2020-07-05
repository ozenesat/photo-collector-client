import React, { useState } from 'react'
import { withRouter } from 'react-router'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
const CollectedPhoto = ({ title, photoUrl, photographer, portfolio, rating, comment, user, id }) => {
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
      .catch(console.err)
  }

  const returnJsx = (
    <Card style={{ width: '60%', margin: 'auto', textAlign: 'center', padding: '1em', border: '0.2em outset', marginBottom: '1em' }}>
      <a rel="noreferrer noopener" target="_blank" href={photoUrl}>
        <Card.Img src={photoUrl}/> </a>
      <Card.Body>
        <Col lg="12" className="text-center">
          <h3>{title}</h3>
          <a href={portfolio} rel="noreferrer noopener" target="_blank">
            By {photographer}
          </a>
          <hr />
          <h3> {comment} </h3>
          <h4> {rating} </h4>
        </Col>
        <Link to={`/photos/${id}/edit`}>
          <Button className="icon-pencil"variant="outline-warning"> {''}Edit </Button>
        </Link>
        {' '}
        <Button className="icon-close" variant="outline-danger" onClick={destroy}> {' '} Remove </Button>
      </Card.Body>
    </Card>
  )
  if (deleted) {
    return (
      <div>
        <AutoDismissAlert
          key= '1'
          heading='Successfully'
          message='Photo deleted from your list!'
          variant='primary'
        />
        <Redirect to={
          { pathname: '/photos' }
        } />
      </div>
    )
  }

  return (
    returnJsx
  )
}

export default withRouter(CollectedPhoto)
