/* @flow */

import { History } from "react-router"
import React from 'react'

export default function WithHistory (Component: React.Element): React.Element {
  return React.createClass({
    mixins: [ History ],
    render () {
      return <Component {...this.props} history={this.history} />
    }
  })
}
