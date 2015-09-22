/* @flow */

import React from "react";

export default class Home extends React.Component {
	render(): React.Element {
		return (
			<div>
				{[...Array(8)].map((x, i) =>
					<p>Welcome home {i + 1}!</p>
				)}
			</div>
		);
	}
}
