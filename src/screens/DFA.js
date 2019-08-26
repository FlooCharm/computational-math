import React, { useState, useEffect } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";
import DFA1 from '../components/DFA1.js';
import DFA2 from '../components/DFA2.js';

function DFA(props) {
	let [word1, setWord1] = useState()
	let [word2, setWord2] = useState()
	let [state1, setState1] = useState(0)
	let [state2, setState2] = useState(0)

	useEffect(() => {
		setState1(0)
	}, [word1])
	useEffect(() => {
		setState2(0)
	}, [word2])

	const dfa1 = {
		0: { 0: 2, 1: 1 },
		1: { 0: 3, 1: 1 },
		2: { 0: 2, 1: 2 },
		3: { 0: 3, 1: 1 }
	}
	const dfa2 = {
		0: { 0: 1, 1: 2 },
		1: { 0: 0, 1: 3 },
		2: { 0: 3, 1: 0 },
		3: { 0: 2, 1: 1 }
	}

	const evaluateFirst = () => {
		let str = word1.split('');
		let i = 0;
		str.forEach(l => {
			i = dfa1[i][l]
			setState1(i)
		})
	}
	const evaluateSecond = () => {
		let str = word2.split('');
		let i = 0;
		str.forEach(l => {
			i = dfa2[i][l]
			setState2(i)
		})
	}


	return (
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>DFA</h1>
				</div>
				<div className='row'>
					<div className='flex1'>
						<React.Fragment>
							<h3>{'L = {w|w starts and ends in 1}'} </h3>
							<DFA1 state={state1}/>
							<div className='row doubleMarginVertical alignItemsCenter'>
								<label>Enter the word to analyze: </label>
								<input
									className='smallMarginRight'
									type='text'
									placeholder='word'
									pattern="[0-1]{1000}"
									onChange={(e) => setWord1(e.target.value)}
								/>
								<button className='button' disabled={!word1} onClick={() => evaluateFirst()}>Evaluate</button>
							</div>
						</React.Fragment>
						<React.Fragment>
							<h3>{"L = {w|w contains an even number of 0's and an even number of 1's}"} </h3>
							<DFA2 state={state2}/>
							<div className='row doubleMarginVertical alignItemsCenter'>
								<label>Enter the word to analyze: </label>
								<input
									className='smallMarginRight'
									type='text'
									placeholder='word'
									pattern="[0-1]{1000}"
									onChange={(e) => setWord2(e.target.value)}
								/>
								<button className='button' disabled={!word2} onClick={() => evaluateSecond()}>Evaluate</button>
							</div>
						</React.Fragment>
					</div>
					<div className='flex1'>
						<h1>Code</h1>
						<h6>Complete code on
							<a href='https://github.com/FlooCharm/computational-math/blob/master/src/screens/DFA.js' target="_blank" rel="noopener noreferrer"> https://github.com/FlooCharm/computational-math</a>
						</h6>
						<Gist id='7cc1a4c265c60edc645070d8181cd34c' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default DFA;