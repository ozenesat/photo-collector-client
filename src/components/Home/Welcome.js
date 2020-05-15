import React from 'react'
import Card from 'react-bootstrap/Card'

// I should welcome my guests, shouldn't I?
const Welcome = () => {
  return (
    <Card className="bg-dark text-white">
      <Card.Img style={{ objectFit: 'cover',
        backgroundPosition: 'center',
        height: '100vh' }} src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title style={{ justifyContent: 'center', fontSize: '35px', textAlign: 'center', fontFamily: 'Permanent Marker, cursive' }}>Welcome to Photo Collector!</Card.Title>
        <hr/>
        <Card.Text style={{ fontSize: '25px', fontFamily: 'Times New Roman', textAlign: 'center', background: 'linear-gradient(0deg, rgba(36,58,111,0.5) 0%, rgba(36,58,111,0.77) 50%, rgba(36,58,111,0.5) 100%)' }}>
        My Photo Collector is a website application where you can view many beautiful photos and
      create your own photo collection with them. You can rate and comment on the photos in your collection while you
      can always edit or delete the items anytime you want. Come discover this website if you want to see
      some spectacular photos and meet the talented people who took them!
          <br/> by <br/>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ozenesat/">M.Esat OZEN</a>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  )
}

export default Welcome
