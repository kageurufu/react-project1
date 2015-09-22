/* @flow */

import React from "react";
import Authenticated from "../decorators/Authenticated"

/*::`*/ @Authenticated("/") /*::`;*/
export default class Greeting extends React.Component {
  titleUsername(): string {
    return this.props.auth.user.username
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  render(): React.Element {
    return (
        <div className="greeting">
          <h1>Hello, {this.titleUsername()}!</h1>
        </div>
    );
  }
};
