import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Main from "containers/Main";

export default class App extends Component {
	render() {
		return (
            <Switch>
                {/*<Route path="/video/:id" component={NewsDetail} />*/}
                {/*<Route path="/video" component={NewsList} />*/}
                <Route path="/" component={Main} />
            </Switch>
		)
	}
}