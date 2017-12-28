// import React, { Component } from 'react'
// import { Navigation } from 'components'
// import { container, innerContainer } from './styles.css'

// export default class MainContainer extends Component {
//   render () {
//     return (
//       <div className={container}>
//         <Navigation isAuthed={true} />
//         <div className={innerContainer}>
//           {this.props.children}
//         </div>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'

export default class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={true} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
