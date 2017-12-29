import ReactDOM from 'react-dom'
import routes from './config/routes'
import { createStore } from 'redux'
import users from 'redux/modules/users'

ReactDOM.render(
  routes,
  document.getElementById('app')
)
