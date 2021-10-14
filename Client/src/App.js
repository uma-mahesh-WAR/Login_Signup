import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./screens/Login_Signup/Login";
import Signup from "./screens/Login_Signup/Signup";
import Dashboard from "./screens/Dashboard/dashboard";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
