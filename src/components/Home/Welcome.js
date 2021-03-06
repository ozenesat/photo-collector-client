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
        <Card.Title style={{ marginTop: '2.5em', justifyContent: 'center', fontSize: '2.5em', textAlign: 'center', fontFamily: 'Righteous, cursive', color: 'white ' }}>Welcome to Photo Collector!</Card.Title>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Card.Text style={{ marginTop: '1.5em', padding: '1em', maxWidth: '1000px', fontSize: '1.5em', fontFamily: 'Times New Roman', textAlign: 'center', background: 'rgba(4,9,23,0.5) ', color: 'white' }}>
        My Photo Collector is a website application where you can view many beautiful photos and
      create your own photo collection with them. You can rate and comment on the photos in your collection while you
      can always edit or delete the items anytime you want. Come discover this website if you want to see
      some spectacular photos and meet the talented people who took them!
            <br/> by <br/>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ozenesat/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'underline' }}>M.Esat OZEN</a>
          </Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  )
}

export default Welcome
