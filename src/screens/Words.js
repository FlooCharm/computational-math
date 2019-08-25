import React, { useState } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";

function Words(props) {
	let [word, setWord] = useState()
	let [text, setText] = useState('')
	
	const firstLang = () => {
		let str = word.split('');
		if(str.length % 2 !== 0) {
			setText(`The word '${word}' is not valid in the first language`)
		} else {
			let zeros = str.splice(0, str.length / 2)
			let ones = str.splice(str.length / 2 - 1, str.length)
			zeros.every(l => l === '0') && ones.every(l => l === '1') ?
				setText(`The word '${word}' is valid in the first language`) : setText(`The word '${word}' is not valid in the first language`)
		}
	}

	const secondLang = () => {
		let str = word.split('');
		let zeros = str.filter(l => l === '0')
		let ones = str.filter(l => l === '1')
		zeros.length === ones.length ? setText(`The word '${word}' is valid in the second language`) : setText(`The word '${word}' is not valid in the second language`)
	}

	return (
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>Word analyzer</h1>
				</div>
				<div className='row'>
					<div className='flex1'>
						<div className='doubleMarginVertical'>
							<label>Enter the word to analyze: </label>
							<input
								type='text'
								placeholder='word'
								pattern="[0-1]{1000}"
								onChange={(e) => setWord(e.target.value)}
							/>
						</div>
						<div>
							<button className='button smallMarginRight' disabled={!word} onClick={() => firstLang()}>First language</button>
							<button className='button' disabled={!word} onClick={() => secondLang()}>Second language</button>
						</div>
						{text}
					</div>
					<div className='flex1'>
						<h1>Code</h1>
						<h6>Complete code on
							<a href='https://github.com/FlooCharm/computational-math/blob/master/src/screens/Words.js' target="_blank" rel="noopener noreferrer"> https://github.com/FlooCharm/computational-math</a>
						</h6>
						<Gist id='5e830ac0ff13567e4305dd60949d9c93' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Words;