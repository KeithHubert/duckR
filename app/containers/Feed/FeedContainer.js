import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux'
import { Feed } from 'components'


class FeedContainer extends React.Component {
    render() {
        return(
            <Feed 
                newDucksAvailable={this.props.newDucksAvailable}
                error={this.props.error}
                isFetching={this.props.isFetching}
                />
        )
    }
}

function mapStateToProps ({feed}) {
    const { newDucksAvailable, error, isFetching } = feed
    return {
        newDucksAvailable,
        error,
        isFetching,
    }
}




FeedContainer.PropTypes = {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
}




export default FeedContainer