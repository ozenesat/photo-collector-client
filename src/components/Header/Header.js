import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './favicon.png'

// Imports for sign-out!
// import SignOut from '../Auth/SignOut'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import { useCookies } from 'react-cookie'
import { signOut } from '../../api/auth'

const Header = ({ user }) => {
  const [cookies, setCookie] = useCookies(['user'])

  const handleSignOut = () => {
    signOut(cookies.user)
      .then(() => setCookie('user', ''))
    return (
      <div>
        <AutoDismissAlert
          key= '1'
          heading='Signed Out Successfully'
          message='Come back soon!'
          variant='primary'/>
      </div>
    )
  }

  const authenticatedOptions = (
    <Fragment>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#photos">My Photo Collection</Nav.Link>
      <NavDropdown title="Search" id="nav-dropdown">
        <Nav.Link href="#search">Search Photos</Nav.Link>
        <Nav.Link href="#collections">Search Collections</Nav.Link>
      </NavDropdown>
      <NavDropdown title="Authorization" id="nav-dropdown">
        <Nav.Link href="#change-password">Change Password</Nav.Link>
        <Nav.Link onClick={handleSignOut} href="#welcome" >Sign Out</Nav.Link>
      </NavDropdown>
    </Fragment>
  )

  // background: 'radial-gradient(circle, transparent 20%, #f9f9f9 20%, #f9f9f9 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #f9f9f9 20%, #f9f9f9 80%, transparent 80%, transparent) 50px 50px, linear-gradient(#98d6ea 8px, transparent 8px) 0 -4px, linear-gradient(90deg, #98d6ea 8px, transparent 8px) -4px 0'
  const unauthenticatedOptions = (
    <Fragment >
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#sign-up">Sign Up</Nav.Link>
      <Nav.Link href="#sign-in">Sign In</Nav.Link>
    </Fragment>
  )

  return (
    <div>
      <Navbar style={{ fontWeight: 'bold',
        backgroundColor: 'rgba(249, 249, 249, 0.7)',
        color: 'white',
        fontFamily: 'Righteous, cursive',
        fontSize: '1.2em' }} className="fixed-top" expand="md">
        <img src={logo} style={{ height: '1.3em' }}/>
        <Navbar.Brand href="#welcome" style={{ fontSize: '1.3em', padding: '0.2em', marginLeft: '0.25em' }}>
         Photo Collector
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ fontSize: '1em' }}>
            { user ? authenticatedOptions : unauthenticatedOptions }
            { user && <span style={{ color: '#98d6ea' }} className="navbar-text mr-2">Welcome, {user.email}</span>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
