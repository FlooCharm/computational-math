import React, { useState, useEffect } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";

function Words(props) {
	
	return (
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>Word analizer</h1>
				</div>
				<div className='row'>
					<div className='flex1'>
						
					</div>
					<div className='flex1'>
						<h1>Code</h1>
						<h6>Complete code on
							<a href='https://github.com/FlooCharm/computational-math/blob/master/src/App.js' target="_blank"> https://github.com/FlooCharm/computational-math</a>
						</h6>
						<Gist id='4283de989e7eb33ce65094073f2988c7' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Words;