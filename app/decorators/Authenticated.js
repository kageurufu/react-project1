/* @flow */

import React from 'react'
import AuthenticationStore from '../stores/AuthenticationStore'
import { History } from 'react-router'
import { Error401 } from '../components/Error'

export default function Authenticated(redirect: ?string): React.Element {
  return function(Component: React.Element): React.Element {
    return React.createClass({
      displayName: "Authenticated(" + JSON.stringify(redirect) + ")",
      mixins: [History],

      handler(e) {
        var auth = AuthenticationStore.getState();
        if(auth.loggedIn) {
          this.setState({auth: AuthenticationStore.getState()});
        } else if (redirect != null) {
          this.history.pushState(null, redirect);
        }
      },

      getInitialState() {
        return {auth: AuthenticationStore.getState()}
      },

    	componentDidMount() {
        if(!this.state.auth.loggedIn && redirect != null) {
          this.history.pushState(null, redirect);
        }
    		AuthenticationStore.listen(this.handler);
    	},

    	componentWillUnmount() {
    		AuthenticationStore.unlisten(this.handler);
    	},

      render () {
        if(this.state.auth.loggedIn) {
          return <Component {...this.props} auth={AuthenticationStore.getState()} />
        } else {
          return <Error401 />
        }
      }
    })
  }
}
