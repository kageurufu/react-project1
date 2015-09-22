/* @flow */

import React from "react"
import Router from "react-router"
import routes from "./route"

// $FlowFixMe: Figure out how to do this right
require("./style/style.less");

React.render(
    <Router routes={routes()} />,
    document.body
);
