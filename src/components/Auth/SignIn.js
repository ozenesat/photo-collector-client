import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn, signUp } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { useCookies } from 'react-cookie'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import GoogleLogin from 'react-google-login'
import logo from '../Home/01.gif'

const SignIn = (props) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['user'])
  const msgAlert = props.msgAlert
  const history = props.history
  const setUser = props.setUser
  const handleEmail = event => {
    event.persist()
    setEmail(event.target.value)
  }

  const handlePassword = event => {
    event.persist()
    setPassword(event.target.value)
  }

  const onSignIn = event => {
    event.preventDefault()
    setLoading(true)
    signIn(email, password)
      .then(res => {
        setCookie('user', res.data.user)
      })
      .then(() => {
        setUser(cookies.user)
      })
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'primary'
      }))
      .then(() => history.push('/home'))
      .catch(error => {
        setEmail('')
        setPassword('')
        setLoading(false)
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }
  const responseGoogle = (response) => {
    setLoading(true)
    const gmail = response.Ot.yu
    const gId = response.googleId
    signUp(gmail, gId, gId)
      .then(() => {
        signIn(gmail, gId)
          .then(res => {
            setCookie('user', res.data.user, { maxAge: 172800 })
            setUser(res.data.user)
          })
          .then(() => msgAlert({
            heading: 'Sign In Success',
            message: messages.signInSuccess,
            variant: 'primary'
          }))
          .then(() => history.push('/home'))
          .catch(error => {
            setEmail('')
            setPassword('')
            setLoading(false)
            msgAlert({
              heading: 'Sign In Failed with error: ' + error.message,
              message: messages.signInFailure,
              variant: 'danger'
            })
          })
      })
      .catch(() => {
        signIn(gmail, gId)
          .then(res => setCookie('user', res.data.user))
          .then(() => {
            setUser(cookies.user)
          })
          .then(() => msgAlert({
            heading: 'Sign In Success',
            message: messages.signInSuccess,
            variant: 'primary'
          }))
          .then(() => history.push('/home'))
          .catch(error => {
            setEmail('')
            setPassword('')
            setLoading(false)
            msgAlert({
              heading: 'Sign In Failed with error: ' + error.message,
              message: messages.signInFailure,
              variant: 'danger'
            })
          })
      })
  }
  const formJsx = (
    <div className="col-sm-3 col-md-4 col mx-auto mt-5">
      <h3 style={{ marginBottom: '1em' }}>Sign In</h3>
      <Form onSubmit={onSignIn}>
        <Form.Group controlId="email" >
          <Form.Label>Email:</Form.Label>
          <Form.Control style={{ textAlign: 'center' }}
            required
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmail}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control style={{ textAlign: 'center' }}
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
        </Form.Group>
        <Button
          variant="outline-info"
          type="submit"
          style={{ marginBottom: '1em' }}
        >
            Submit
        </Button>
      </Form>
      <GoogleLogin
        clientId="298833457462-vdgqqdgkfahbengirfhpsb61vjeohouu.apps.googleusercontent.com"
        buttonText="Sign In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {loading && <img src={logo}/>}
    </div>
  )
  if (loading) {
    return (
      <div style={{ marginTop: '4em', padding: '1em', textAlign: 'center' }}>
        <h1> Welcome to Photo Collector!</h1>
        <img src={logo}/>
      </div>
    )
  }
  return (
    <div className="row" style={{ marginTop: '2em', padding: '1em', textAlign: 'center' }}>
      {formJsx}
    </div>
  )
}

export default withRouter(SignIn)
