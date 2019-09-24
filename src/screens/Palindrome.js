import React, { useState } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";

function Palindrome(props) {
	let [word, setWord] = useState('');
	let [result, setResult] = useState();
	let stopCases = ['', '0', '1']
	let rules = {
		1: {
			exp: new RegExp('^0.*0$'),
			match: (word) => {
				return word.substring(1, word.length - 1);
			}
		},
		2: {
			exp: new RegExp('^1.*1$'),
			match: (word) => {
				return word.substring(1, word.length - 1);
			}
		}
	}

	const evaluate = (w) => {
		if(stopCases.includes(w)) {
			setResult("It's a palindrome!")
			return;
		}
		else if(rules[1].exp.test(w)) {
			let newWord = rules[1].match(w);
			setWord(newWord);
			evaluate(newWord);
			return;
		}
		else if(rules[2].exp.test(w)) {
			let newWord = rules[2].match(w);
			setWord(newWord);
			evaluate(newWord);
			return;
		}
		else {
			setResult("It's not a palindrome T_T")
			return;
		}
	}

	return (
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>Palindromes</h1>
				</div>
				<div className='row'>
					<div className='flex1'>
						<div className='row doubleMarginVertical alignItemsCenter'>
							<label>Enter the word to analyze: </label>
							<input
								className='smallMarginRight'
								type='text'
								placeholder='word'
								pattern="[0-1]{1000}"
								onChange={(e) => setWord(e.target.value)}
							/>
							<button className='button smallMarginRight' onClick={() => evaluate(word)}>Evaluate</button>
							<button className='button' onClick={() => {
								setWord('');
								setResult('');
							}}>Clear</button>
						</div>
						{result}
					</div>
					<div className='flex1'>
						<h1>Code</h1>
						<h6>Complete code on
							<a href='https://github.com/FlooCharm/computational-math/blob/master/src/screens/Palindrome.js' target="_blank" rel="noopener noreferrer"> https://github.com/FlooCharm/computational-math</a>
						</h6>
						<Gist id='c993a4f82a07ba3e110f83e3c01ebddf' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Palindrome;