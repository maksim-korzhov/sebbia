import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Main from "containers/Main";

import NewsList from "containers/NewsList";

export default class App extends Component {
	render() {
		return (
            <Switch>
                <Route path="/category/:categoryId" component={ NewsList } />
                <Route path="/" component={Main} />
            </Switch>
		)
	}
}