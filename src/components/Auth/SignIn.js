import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { useCookies } from 'react-cookie'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import GoogleLogin from 'react-google-login'

const SignIn = (props) => {
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
    signIn(email, password)
      .then(res => setCookie('user', res.data.user))
      .then(() => {
        // console.log(cookies, 'cook')
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
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  const responseGoogle = (response) => {
    console.log(response)
  }
  return (
    <div className="row" style={{ marginTop: '2em', padding: '1em', textAlign: 'center' }}>
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
          >
              Submit
          </Button>
          <GoogleLogin
            clientId="298833457462-vdgqqdgkfahbengirfhpsb61vjeohouu.apps.googleusercontent.com"
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="outline-info"
                type="submit"
              >
                <span>Google</span>
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />
        </Form>
      </div>
    </div>
  )
}

export default withRouter(SignIn)
