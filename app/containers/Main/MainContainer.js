import React from 'react'

export default class MainContainer extends React.Component {
  render () {
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
}
