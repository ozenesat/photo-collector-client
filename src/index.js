import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

const appJsx = (
  <CookiesProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CookiesProvider>
)

ReactDOM.render(appJsx, document.getElementById('root'))
