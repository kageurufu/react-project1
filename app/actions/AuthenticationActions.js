/* @flow */

import md5 from 'md5'
import User from '../models/User'
import Alt from '../Alt'
import HTTP from "../HTTP"
import Action from './Action'

class AuthenticationActions extends Action {

  login(username: string, password: string) {
    HTTP
      .post("/api/login", {username: username, password: password})
      .then((user) => { this.dispatch(user); })
      .catch((error) => { this.dispatch(null); })
  }

  logout() {
    setTimeout(() => {
      this.dispatch();
    }, 400)
  }
}

export default Alt.createActions(AuthenticationActions);
