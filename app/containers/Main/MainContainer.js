import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { withRouter } from 'react-router'


class MainContainer extends Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/feed') {
          this.context.router.history.replace('feed')
        }
      } else {
        // allows render to fire UI below
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    // while the user is still being authed return nothing, then kick off the app
    return this.props.isFetching === true
      ? null
      : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
  }
}
MainContainer.contextTypes = {
  router: PropTypes.object.isRequired}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default withRouter(connect(
  (state) => ({ isAuthed: state.users.isAuthed, isFetching: state.users.isFetching }),
  (dispatch) => bindActionCreators({...userActionCreators, ...usersLikesActionCreators}, dispatch)
)(MainContainer))

// updated and works, need to update rest of app though
// export default withRouter(connect(
//   (state) => ({ isAuthed: state.isAuthed })
// )(MainContainer))

// (state) => ({isAuthed: state.isAuthed}) = mapToState
