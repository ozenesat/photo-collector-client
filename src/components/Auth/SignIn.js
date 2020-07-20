import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { useCookies } from 'react-cookie'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// Social Login imports
import { useAuth0 } from '@auth0/auth0-react'
import { useApi } from './use-api'

export const Profile = () => {
  console.log('profile!')
  const domain = 'dev-44e3kccw.us.auth0.com'
  const opts = {
    audience: `https://${domain}/api/v2`,
    scope: 'read:users'
  }
  const { login, getTokenWithPopup } = useAuth0()
  const { loading, error, refresh, data: users } = useApi(
    // https://mysterious-escarpment-32571.herokuapp.com
    'https://mysterious-escarpment-32571.herokuapp.com',
    opts
  )
  const getTokenAndTryAgain = async () => {
    await getTokenWithPopup(opts)
    refresh()
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    if (error.error === 'login_required') {
      return <button onClick={() => login(opts)}>Login</button>
    }
    if (error.error === 'consent_required') {
      return (
        <button onClick={getTokenAndTryAgain}>Consent to reading users</button>
      )
    }
    return <div>Oops {error.message}</div>
  }
  return (
    <ul>
      {users.map((user, index) => {
        return <li key={index}>{user}</li>
      })}
    </ul>
  )
}

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

  // Social Login with Auth0Provider
  const { loginWithRedirect } = useAuth0()

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
          <button onClick={loginWithRedirect}>Log In</button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(SignIn)
