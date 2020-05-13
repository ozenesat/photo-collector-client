import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Photo = ({ title, photoId, photoUrl }) => {
  // const [photo, setPhoto] = useState(null)
  const photoJsx = (
    <Card style={{ width: '55%', margin: 'auto' }}>
      <Card.Img variant="bottom" src={photoUrl} />
      <Card.Body>
        <Card.Text>
          {title}
          <hr />
          <Form>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select">
                <option>⭐</option>
                <option>⭐⭐</option>
                <option>⭐⭐⭐</option>
                <option>⭐⭐⭐⭐</option>
                <option>⭐⭐⭐⭐🌟</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comments</Form.Label>
              <Form.Control as="comment" rows="3" />
            </Form.Group>
          </Form>
          <Button variant="outline-success" type="submit">Submit</Button>
          {'  '}
          <Button variant="outline-warning">
              Delete
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )

  return (
    photoJsx
  )
}

export default Photo
