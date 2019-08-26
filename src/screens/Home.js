import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function App(props) {
	return (
		<React.Fragment>
			<Link to='/matrix' className='link row'>Matrix Operations</Link>
			<Link to='/words' className='link row'>Word analyzer</Link>
			<Link to='/dfa' className='link row'>DFAs</Link>
		</React.Fragment>
	)
}

export default App;