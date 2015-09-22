/* @flow */

import React from "react"
import md5 from 'md5'

import AuthenticationStore from "../stores/AuthenticationStore"
import AuthenticationActions from "../actions/AuthenticationActions"

export default class Login extends React.Component {
	constructor(props: any) {
		super(props);

		this.state = {
			auth: AuthenticationStore.getState(),
		};
	}

	login() {
		AuthenticationActions.login(this.state['form.username'], this.state['form.password']);
	}

	render(): React.Element {
		return (
			<div className="form">
				<form onSubmit={(e) => {this.login(); e.preventDefault(); }}>
					<label>
						Username
						<input name="username" type="text" onChange={e => this.setState({'form.username': e.target.value.toLowerCase()})} />
					</label>
					<label>
						Password
						<input name="password" type="password" onChange={e => this.setState({'form.password': e.target.value})} />
					</label>
					<div className="row">
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}
