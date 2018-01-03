// import React from 'react'
import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

// REMOVED we don't need it
// class ModalContainer extends React.Component {
//   render () {
//     return (
//       <Modal />
//     )
//   }
// }

// <Modal /> receives mapStateToProps and dispatched action creators as props
// but <Modal /> also has no lifecycle events / state, why do we need it? We don't no need for another
// React component. We can just pass what we need down directly to the component that needs it. Neat.

// passes props to modal / users container
function mapStateToProps ({modal, users}) {
  const duckTextLength = modal.duckText.length
  return {
    // safeguard to make sure user is not undefined when it goes to modal
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch)
}

// Takes mapStateToProps and mapDispatchToProps and passes them directly to Modal
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)
