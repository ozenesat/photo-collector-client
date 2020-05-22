import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Welcome from '../Home/Welcome'
import SignUp from '../Auth/SignUp'
import SignIn from '../Auth/SignIn'
import SignOut from '../Auth/SignOut'
import ChangePassword from '../Auth/ChangePassword'
import Search from '../Photos/Search'
import SearchCollections from '../Photos/SearchCollections'
import Photos from '../Photos/PhotosIndex'
import PhotoShow from '../Photos/PhotoShow'
import PhotoUpdate from '../Photos/PhotoUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

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
            <Home msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/welcome' render={() => (
            <Welcome msgAlert={this.msgAlert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/search' render={() => (
            <Search msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/collections' render={() => (
            <SearchCollections msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/photos' render={() => (
            <Photos msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/photos/:id' render={() => (
            <PhotoShow msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/photos/:id/edit' render={() => (
            <PhotoUpdate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
