import React, { useState, useRef/*, useEffect*/ } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";

const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function DFA(props) {
	let [rows, setRows] = useState();
	let [accepted, setAccepted] = useState();
	let [alphabet, setAlphabet] = useState('');
	let [grid, setGrid] = useState();
	let [result, setResult] = useState();
	let matrix = useRef();

	const setArray = (rows, cols) => {
		let arr = Array(rows).fill([]);
		for(let j = 0; j < rows; j++)
			arr[j] = Array(cols).fill(0)
		return arr;
	}

	const drawMatrix = () => {
		let t = []
		let tRow = []
		let symbols = alphabet.split(',');

		for(let i = 0; i <= rows ; i++) {
			for(let j = 0; j <= symbols.length; j++) {
				if(i === 0) {
					tRow.push(j === 0 ? (
						<input
							type='text'
							className='transitionCell'
							placeholder={`${i}, ${j}`}
							key={`${i}, ${j}`}
							value='-'
							readOnly
						/>
					) : (
						<input
							type='text'
							className='transitionCell'
							placeholder={`${i}, ${j}`}
							key={`${i}, ${j}`}
							value={symbols[j-1]}
							readOnly
						/>
					))
				} else {
					tRow.push(
						<input
							type='text'
							className='transitionCell'
							placeholder={`${i}, ${j}`}
							key={`${i}, ${j}`}
							onChange={e => changeValue(i-1, j, e.target.value)}
						/>
					)
				}
			}
			t.push(<div className='row' key={`row${i}`}>{tRow}</div>)
			tRow = []
		}

		setGrid(t)
		matrix.current = setArray(rows, symbols.length + 1)
	}

	const changeValue = (row, col, val) => {
		let fake = matrix.current.slice()
		fake[row][col] = val;
		matrix.current = fake
	}

	const convert = () => {
		let t = []
		let tRow = []
		let alphI = 0;
		let relations = {}
		for(let i = 0; i < rows; i ++) {
			for(let j = 0; j <= alphabet.split(',').length; j++) {
				let accState = accepted.split(',').map(state => matrix.current[i][j].split(',').includes(state))
				if(!relations[matrix.current[i][j]]) {
					relations[matrix.current[i][j]] = alph[alphI]
					alphI++;
				}
				tRow.push(<td key={`${i}, ${j}`}>{`${(i === 0 && j === 0) ? '\u2192' : ''} ${(accState[0] && j === 0) ? '*' : ''} ${relations[matrix.current[i][j]]}`}</td>)
			}
			t.push(<tr key={`row${i}`}>{tRow}</tr>)
			tRow = []
		}
		setResult(t)
	}

	return (
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>NFA to DFA</h1>
				</div>
				<div className='row smallMarginTop'>
					<div className='flex1'>
						<div>
							<label>Enter the alphabet (separate each symbol with a comma and no spaces): </label>
							<input
								type='text'
								placeholder='0,1,2,...'
								// className='smallMarginRight'
								onChange={e => setAlphabet(e.target.value)}
							/>
						</div>
						<div className='smallMarginTop'>
							<label>Enter the accepted states: </label>
							<input
								type='text'
								placeholder='q0,q1,...'
								// className='smallMarginRight'
								onChange={e => setAccepted(e.target.value)}
							/>
						</div>
						<div className='smallMarginTop'>
							<label>Enter the number of rows for the transition table: </label>
							<input
								type='number'
								placeholder='rows'
								// className='smallMarginRight'
								onChange={e => setRows(parseInt(e.target.value))}
							/>
						</div>
						<button
							className='button smallMarginTop'
							disabled={!(alphabet && rows)}
							onClick={async () => drawMatrix()}
						>
							Set table
						</button>
						<div className='smallMarginTop'>
							{grid && (
								<React.Fragment>
									<div className='row alignItemsCenter'>
										<div className='marginRight'>
											<h3>Enter NFA's transition table</h3>
											<h4>(separate each state with a comma and no spaces)</h4>
										</div>
										<button className='button smallMarginTop' onClick={() => convert()}>Convert to DFA</button>
									</div>
									{grid}
								</React.Fragment>
							)}
							{result && (
								<React.Fragment>
									<hr />
									<div className='row alignItemsCenter smallMarginTop'>
										<div className='marginRight'>
											<h1>DFA</h1>
										</div>
										<table>
											<thead>
												<tr>
													<th />
													{alphabet.split(',').map(a => <th key={a}>{a}</th>)}
												</tr>
											</thead>
											<tbody>
											{result}
											</tbody>
										</table>
									</div>
								</React.Fragment>
							)}
						</div>
					</div>
					<div className='flex1'>
						<h1>Code</h1>
						<h6>Complete code on
							<a href='https://github.com/FlooCharm/computational-math/blob/master/src/screens/NFAtoDFA.js' target="_blank" rel="noopener noreferrer"> https://github.com/FlooCharm/computational-math</a>
						</h6>
						<Gist id='237cee7be53098eed03e61f47701037e' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default DFA;