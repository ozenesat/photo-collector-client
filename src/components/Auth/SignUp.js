import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { useCookies } from 'react-cookie'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import GoogleLogin from 'react-google-login'

const SignUp = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPassConf] = useState('')
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

  const handlePassConf = event => {
    event.persist()
    setPassConf(event.target.value)
  }

  const onSignUp = event => {
    event.preventDefault()

    signUp(email, password, passwordConfirmation)
      .then(() => signIn(email, password))
      .then(res => {
        setUser(res.data.user)
        setCookie('user', res.data.user)
        console.log(cookies) // find a way to get rid of it!
      })
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'primary'
      }))
      .then(() => history.push('/home'))
      .catch(error => {
        setEmail('')
        setPassword('')
        setPassConf('')
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  const responseGoogle = (response) => {
    const gmail = response.Ot.yu
    const gId = response.googleId
    signUp(gmail, gId, gId)
      .then(() => {
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
            msgAlert({
              heading: 'Sign In Failed with error: ' + error.message,
              message: messages.signInFailure,
              variant: 'danger'
            })
          })
      })
  }

  return (
    <div className="row" style={{ marginTop: '2em', padding: '1em', textAlign: 'center' }}>
      <div className="col-sm-3 col-md-4 col mx-auto mt-5">
        <h3 style={{ marginBottom: '1em' }}>Sign Up</h3>
        <Form onSubmit={onSignUp}>
          <Form.Group controlId="email">
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
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Confirmation:</Form.Label>
            <Form.Control style={{ textAlign: 'center' }}
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={handlePassConf}
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
          buttonText="Sign Up"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

export default withRouter(SignUp)
