import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#photos">My Photo Collection</Nav.Link>
    <Nav.Link href="#search">Search Photos</Nav.Link>
    <NavDropdown title="Authorization" id="nav-dropdown">
      <Nav.Link href="#change-password">Change Password</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link to="/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar style={{ background: 'linear-gradient(90deg, rgba(211,231,238,1) 1%, rgba(94,195,200,1) 50%, rgba(211,231,238,1) 100%)',
    fontWeight: 'bold',
    fontFamily: 'Permanent Marker, cursive' }} expand="md">
    <Navbar.Brand className="icon-camera" href="#">
      Photo Collector
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
