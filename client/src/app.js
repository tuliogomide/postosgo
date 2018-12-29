import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, BrowserHistory, Switch } from 'react-router-dom';


import App from './components/App';

ReactDOM.render((
	<Router history={BrowserHistory}>		
		<App />
	</Router>
	),
	document.getElementById("app")
	


);