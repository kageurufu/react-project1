/* @flow */

import React from "react";
import Header from "./Header";
import AuthenticationStore from "../stores/AuthenticationStore"

export default class App extends React.Component {
	constructor(props: any) {
		super(props)

		this.state = {
			auth: AuthenticationStore.getState()
		}
	}

	componentDidMount() {
		this.handler = (e) => {
			console.log(arguments);
			this.setState({auth: AuthenticationStore.getState() });
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
