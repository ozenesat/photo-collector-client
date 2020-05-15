import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sweet-home">Home</Nav.Link>
    <Nav.Link href="#photos">My Photo Collection</Nav.Link>
    <Nav.Link href="#search">Search Photos</Nav.Link>
    <NavDropdown title="Authorization" id="nav-dropdown">
      <Nav.Link href="#change-password">Change Password</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment >
    <Nav.Link href="#home">Home</Nav.Link>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <div>
    <Navbar style={{ background: 'linear-gradient(90deg, rgba(36,58,111,0.35) 3%, rgba(36,58,111,0.87) 50%, rgba(36,58,111,0.35) 97%)',
      fontWeight: 'bold',
      fontFamily: 'Permanent Marker, cursive' }} expand="md">
      <Navbar.Brand href="#welcome">
      📸 Photo Collector
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user ? authenticatedOptions : unauthenticatedOptions }
          { user && <span style={{ color: 'rgba(36,58,111,0.77)' }} className="navbar-text mr-2">Welcome, {user.email}</span>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

export default Header
