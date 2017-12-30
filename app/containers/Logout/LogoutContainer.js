import React from 'react'
import PropTypes from 'prop-types'
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/modules/users'
import { connect } from 'react-redux'

class LogoutContainer extends React.Component {
    componentDidMount () {
        this.props.dispatch(logoutAndUnauth())
      }
    render() {
        return(
            <Logout />
        )
    }
}

LogoutContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

// usually we would use bindActionCreators, use a second arg specifying what action creators we
// want to bind to dispatch but because we only have one we can do this.props.dispatch, nbd
export default connect()(LogoutContainer)
