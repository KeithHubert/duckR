import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends React.Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds}/>
    )
  }
}

function mapStateToProps ({feed}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

FeedContainer.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  duckIds: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
