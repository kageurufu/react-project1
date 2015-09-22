/* @flow */

import { Router, Route, Link, IndexRoute } from "react-router";
import React from "react";

import App from "./components/App";
import Home from "./components/Home";
import Greeting from "./components/Greeting";
import Error404 from "./components/Error";
import Login from "./components/Login";

var routes = function(): React.Element {
	return (
		<Router>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="greet/:name" component={Greeting} />
				<Route path="login" component={Login} />

				// This route must stay at the end
				<Route path="*" component={Error404} />
			</Route>
		</Router>
	);
}

export default routes;
