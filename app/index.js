import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import users from 'redux/modules/users'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { checkIfAuthed } from 'helpers/auth'

const store = createStore(users, compose(
  applyMiddleware(thunk),
  // does window.devToolsExtension() exist? if so fire it up, otherwise return 1st arg
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
))

function checkAuth (nextState, replace) {
  if (store.getState().isFetching === true) {
    return
  }
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
document.getElementById('app'))

// replacing routes with getRoutes and passing down checkAuth
