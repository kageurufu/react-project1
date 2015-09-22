/* @flow */

import React from "react";
import Header from "./Header";
import AuthenticationStore from "../stores/AuthenticationStore"
import WithHistory from '../decorators/History'

/*::`*/ @WithHistory /*::`;*/
export default class App extends React.Component {
	constructor(props: any) {
		super(props)

		this.state = {
			auth: AuthenticationStore.getState()
		}
	}

	componentDidMount() {
		this.handler = (store) => {
			this.setState({auth: AuthenticationStore.getState() });
			if (AuthenticationStore.getState().auth.loggedIn) {
				this.props.history.pushState(null, '/');
			}
		};
		AuthenticationStore.listen(this.handler);
	}

	componentWillUnmount() {
		AuthenticationStore.unlisten(this.handler);
	}

	render(): React.Element {
		console.log("App render");
		return (
			<div>
				<Header />
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
