import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "assets/styles/styles.scss";

import { store } from "store";

import App from "components/App";


const renderApp = Component => {
	render(
        <Provider key={ module.hot ? Date.now() : store} store={store}>
            <BrowserRouter>
                <AppContainer>
                    <Component />
                </AppContainer>
            </BrowserRouter>
        </Provider>,
		document.querySelector("#mount_place")
	)
};

renderApp(App);

if(module.hot) {
	module.hot.accept("components/App", () => { renderApp(App) });
}
