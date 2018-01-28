import React from "react";
import { render } from "react-dom";
import "assets/styles/styles.scss";
import HelloComponent from "components/HelloComponent";
import { AppContainer } from "react-hot-loader";


const renderApp = Component => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.querySelector("#mount_place")
	)
};

renderApp(HelloComponent);

if(module.hot) {
	module.hot.accept("components/HelloComponent", () => { renderApp(HelloComponent) });
}
