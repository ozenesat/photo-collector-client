import React, { useState, useEffect, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Welcome from '../Home/Welcome'
import SignUp from '../Auth/SignUp'
import SignIn from '../Auth/SignIn'
// import SignOut from '../Auth/SignOut'
import ChangePassword from '../Auth/ChangePassword'
import Search from '../Photos/Search'
import SearchCollections from '../Photos/SearchCollections'
import Photos from '../Photos/PhotosIndex'
import PhotoShow from '../Photos/PhotoShow'
import PhotoUpdate from '../Photos/PhotoUpdate'
import { withCookies } from 'react-cookie'

const App = (props) => {
  const { cookies } = props
  const [user, setUser] = useState('')
  const [msgAlerts, setMsgAlerts] = useState([])
  const history = props.history
  // const clearUser = () => setUser(null)
  useEffect(() => {
    setUser(cookies.get('user'))
  }, [props.allCookies.user])
  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts([...msgAlerts, { heading, message, variant }])
  }

  if (history.location.pathname === '/') {
    history.push('/welcome')
  }

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
        />
      ))}
      <main className="container-fluid" style={{ padding: '0px' }}>
        <Route exact path='/home' render={() => (
          <Home msgAlert={msgAlert} user={user} />
        )} />
        <Route exact path='/welcome' render={() => (
          <Welcome msgAlert={msgAlert} user={user} />
        )} />
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={msgAlert} setUser={setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={msgAlert} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/search' render={() => (
          <Search msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/collections' render={() => (
          <SearchCollections msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/photos' render={() => (
          <Photos msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/photos/:id' render={() => (
          <PhotoShow msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/photos/:id/edit' render={() => (
          <PhotoUpdate msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword msgAlert={msgAlert} user={user} />
        )} />
      </main>
    </Fragment>
  )
}

export default withCookies(withRouter(App))
