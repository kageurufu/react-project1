/* @flow */

import md5 from 'md5';

var _nextId = (() => {
  var cur = 0;
  return () => {
    return ++cur;
  }
})();

export default class User {
  id: number;
  name: string;
  password: string;
  email: string;

  constructor(name: string, password: string, email: string) {
    this.id = _nextId();
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
