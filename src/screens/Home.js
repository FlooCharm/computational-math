import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function App(props) {
	return (
		<React.Fragment>
			<div className='link'>
				<Link to='/matrix'>Matrix Operations</Link>
			</div>
			<div className='link'>
				<Link to='/words'>Word analizer</Link>
			</div>
			<div className='link'>
				<Link to='/dfa'>DFAs</Link>
			</div>
		</React.Fragment>
	)
}

export default App;