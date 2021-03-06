import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { checkIfAuthed } from 'helpers/auth'
import restricted from 'helpers/restricted'


// will look at modules folder for anything being exported from index.js will be a property of reducers obj
import * as reducers from 'redux/modules'

function checkAuth (component) {
  return restricted(component, store)
}

// add reducers instead of one user obj
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  // does window.devToolsExtension() exist? if so fire it up, otherwise return 1st arg
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
))

function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) {
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
  document.getElementById('app')
)

// replacing routes with getRoutes and passing down checkAuth
