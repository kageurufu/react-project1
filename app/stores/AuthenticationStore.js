/* @flow */

import AuthenticationActions from '../actions/AuthenticationActions'
import Alt from '../Alt'
import User from '../models/User'
import Store from './Store'

type AuthenticationState = { user: ?User, loggedIn: boolean }

class AuthenticationStore extends Store {
	user: ?User;
	loggedIn: bool;

	constructor() {
		super();
		this.user = null;
		this.loggedIn = false;

		this.bindListeners({
			handleLogin: AuthenticationActions.LOGIN,
			handleLogout: AuthenticationActions.LOGOUT
		});
	}

	handleLogin(user: ?User) {
		console.log(user);
		this.user = user;
		this.loggedIn = !(user == null);
	}

	handleLogout() {
		this.handleLogin();
	}

	getState(): AuthenticationState{
			return {user: this.user, loggedIn: this.loggedIn};
	}
}

export default Alt.createStore(AuthenticationStore);
