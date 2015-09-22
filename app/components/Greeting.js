/* @flow */

import React from "react";

export default class Greeting extends React.Component {
  render(): React.Element {
    return (
        <div className="greeting">
          <h1>Hello, {this.props.params.name}!</h1>
        </div>
    );
  }
};
