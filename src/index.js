import React from "react";
import ReactDOM from "react-dom";

import "halfmoon/css/halfmoon-variables.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProvideAuth } from "./routes/ProvideAuth";

ReactDOM.render(
	<React.StrictMode>
		<ProvideAuth>
			<App />
		</ProvideAuth>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
