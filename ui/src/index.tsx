import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import ReactModal from 'react-modal'

import App from './App'
import { updateAvailable } from './appStore'
import configureStore from './configureStore'
import { isTrustedWebActivity } from './helpers'
import * as serviceWorker from './serviceWorkerRegistration'
import { REDIRECT_URL } from './constants'
import { ApplicationState } from './store'

const lastRunKey = 'readflow.lastRun'

const run = () => {
  const history = createBrowserHistory()
  const initialState = window.initialReduxState as ApplicationState
  const store = configureStore(history, initialState)
  ReactModal.setAppElement('#root')
  ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'))
  serviceWorker.register({ onUpdate: (registration) => store.dispatch(updateAvailable(registration)) })
  localStorage.setItem(lastRunKey, new Date().toISOString())
}

const shouldRedirect = () => {
  return !isTrustedWebActivity() && localStorage.getItem(lastRunKey) === null && document.location.pathname !== '/login'
}

if (shouldRedirect()) {
  // No previous usage, then redirect to about page.
  document.location.replace(REDIRECT_URL)
} else {
  run()
}
