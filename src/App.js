import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './screens/Home.js';
import Matrix from './screens/Matrix.js';
import Words from './screens/Words.js';
import DFA from './screens/DFA.js';
import NFAtoDFA from './screens/NFAtoDFA.js';

function App(props) {
	return (
		<Router>
			<Route path='/' exact component={Home}/>
			<Route path='/matrix' exact component={Matrix}/>
			<Route path='/words' exact component={Words}/>
			<Route path='/dfa' exact component={DFA}/>
			<Route path='/nfa2dfa' exact component={NFAtoDFA}/>
		</Router>
	)
}

export default App;