/* @flow */

import React from "react"
import { Link } from "react-router";
import AuthenticationStore from "../stores/AuthenticationStore"
import AuthenticationActions from '../actions/AuthenticationActions'

export default class Header extends React.Component {
	constructor(props: any) {
		super(props)

		this.state = {
			auth: AuthenticationStore.getState()
		}
	}

	componentDidMount() {
		this.handler = (e) => { this.setState({auth: AuthenticationStore.getState() }); };
		AuthenticationStore.listen(this.handler);
	}

	componentWillUnmount() {
		AuthenticationStore.unlisten(this.handler);
	}

	userBlock(): React.Element {
		if(this.state.auth.loggedIn) {
			return (
				<ul className="right">
					<li>Welcome, {this.state.auth.user.email}</li>
					<li><a onClick={() => { AuthenticationActions.logout() }}>Logout</a></li>
				</ul>
			)
		} else {
			return (
				<ul className="right">
					<li><Link activeClassName="current" to="/login">Login</Link></li>
			 	</ul>
			)
		}
	}

	links(): React.Element {
		if(this.state.auth.loggedIn) {
			return (
				<ul>
					<li><Link activeClassName="current" to="/">Home</Link></li>
					<li><Link activeClassName="current" to="/greet">Greet</Link></li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li><Link activeClassName="current" to="/">Home</Link></li>
				</ul>
			);
		}
	}

	render(): React.Element {
		console.log("Header render");
		return (
			<header>
				<a className="brand">Project</a>

				{this.userBlock()}
				{this.links()}
			</header>
		);
	}
}
