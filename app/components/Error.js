/* @flow */

import React from "react"

export class Error404 extends React.Component {
	render(): React.Element {
		return (
			<div className="error">
				<h1>Page not found</h1>
			</div>
		);
	}
}

export class Error500 extends React.Component {
	render(): React.Element {
		var errorMessage;
		return (
			<div className="error">
				<h1>There was an error rendering this page</h1>
				<p>{this.props.errorMessage}</p>
			</div>
		)
	}
}

export class Error401 extends React.Component {
	render(): React.Element {
		return (
			<div className="error">
				<h1>Not Authenticated</h1>
				<p>You must be logged in to view this page</p>
			</div>
		);
	}
}

export default {
	'404': Error404,
	'401': Error401,
	'500': Error500
}
