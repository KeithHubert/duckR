import React from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// create object of userActionCreators (everything exported from users.js)
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
  }
  render () {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

// the state we care about
function mapStateToProps (state) {
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}

// bind action calls to dispatch
function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)

// 4 dispatches before thunks above, instead of keeping logic in component, encapsalate it in another fn in users.js
// class AuthenticateContainer extends React.Component {
//   handleAuth () {
//     this.props.fetchingUser()
//     auth().then((user) => {
//       this.props.fetchingUserSuccess(user.uid, user, Date.now())
//       this.props.authUser(user.id)
//     })
//       .catch((error) => userActionCreators.fetchingUserFailure(error))
//   }
