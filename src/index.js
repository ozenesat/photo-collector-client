import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { Auth0Provider } from '@auth0/auth0-react'

const appJsx = (
  <CookiesProvider>
    <HashRouter>
      <Auth0Provider
        domain="dev-44e3kccw.us.auth0.com"
        clientId="0ZhZVDOi16mCt7KwV9eY69KjOHbtts2Q"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </HashRouter>
  </CookiesProvider>
)

ReactDOM.render(appJsx, document.getElementById('root'))
