import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Authenticate } from 'components'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  constructor (props) {
    super(props)

    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth (e, authType) {
    e.preventDefault();

    this.props.fetchAndHandleAuthedUser(authType)
      .then(() => this.context.router.replace('feed'))
  }

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

// function mapStateToProps (state) {
//   return {
//     isFetching: state.users.isFetching,
//     error: state.users.error,
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return bindActionCreators(userActionCreators, dispatch)
// }

export default connect(
  ({users}) => ({isFetching: users.isFetching, error: users.error}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)

// import React from 'react'
// import PropTypes from 'prop-types'
// import { Authenticate } from 'components'
// import auth from 'helpers/auth'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// // create object of userActionCreators (everything exported from users.js)
// import * as userActionCreators from 'redux/modules/users'

// class AuthenticateContainer extends React.Component {
//   handleAuth (e) {
//     e.preventDefault()
//     this.props.fetchAndHandleAuthedUser()
//     // fetchHandleAuthedUser returns a promise
//     // once authed it goes to 'feed' rout
//       .then(() => this.context.router.replace('feed'))
//   }
//   render () {
//     return (
//       <Authenticate
//         onAuth={this.handleAuth}
//         isFetching={this.props.isFetching}
//         error={this.props.error} />
//     )
//   }
// }

// AuthenticateContainer.propTypes = {
//   isFetching: PropTypes.bool.isRequired,
//   error: PropTypes.string.isRequired,
//   fetchAndHandleAuthedUser: PropTypes.func.isRequired,
// }

// // contextTypes is deprectiated, do not use in future
// AuthenticateContainer.contextTypes = {
//   router: PropTypes.object.isRequired,
// }

// // the state we care about
// // function mapStateToProps (state) {
// //   return {
// //     isFetching: state.isFetching,
// //     error: state.error,
// //   }
// // }

// // bind action calls to dispatch
// // function mapDispatchToProps (dispatch) {
// //   return bindActionCreators(userActionCreators, dispatch)
// // }

// export default connect(
//   (state) => ({isFetching: state.isFetching, error: state.error}),
//   (dispatch) => bindActionCreators(userActionCreators, dispatch)
// )(AuthenticateContainer)

// // 4 dispatches before thunks above, instead of keeping logic in component, encapsalate it in another fn in users.js
// // class AuthenticateContainer extends React.Component {
// //   handleAuth () {
// //     this.props.fetchingUser()
// //     auth().then((user) => {
// //       this.props.fetchingUserSuccess(user.uid, user, Date.now())
// //       this.props.authUser(user.id)
// //     })
// //       .catch((error) => userActionCreators.fetchingUserFailure(error))
// //   }
