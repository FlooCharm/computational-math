import React, { useState } from 'react';
import './App.css';

function App(props) {
	let [aMatrixGrid, setAMatrixGrid] = useState([]);
	let [bMatrixGrid, setBMatrixGrid] = useState([]);
	let [aMatrix, setAMatrix] = useState([]);
	let [bMatrix, setBMatrix] = useState([]);
	let [n, setN] = useState();

	const setArray = () => {
		let arr = Array(parseInt(n)).fill(0);
		for(let j = 0; j < n; j++)
			arr[j] = Array(parseInt(n)).fill(0)
		return arr;
	}

	const setGrids = async () => {
		setAMatrix(setArray())
		setBMatrix(setArray())
		setGrid('a');
		setGrid('b');
	}

	const setGrid = (matrix) => {
		let arr = matrix === 'a' ? aMatrix : bMatrix;
		let content = arr.map((row, rIndex) => {
			return (
				<div key={rIndex}>
					{ renderRow(matrix, row, rIndex) }
				</div>
			)
		})
		matrix === 'a' ? setAMatrixGrid(content) : setBMatrixGrid(content);
	}

	const renderRow = (matrix, row, rIndex) => {
		return row.map((col, cIndex) => {
			return (
				<input
					type='number'
					className='matrixCell'
					placeholder={`${rIndex}, ${cIndex}`}
					key={`${rIndex}, ${cIndex}`}
					onChange={e => changeValue(matrix, rIndex, cIndex, e.target.value)}
				/>
			)
		})
	}

	const changeValue = (matrix, row, col, val) => {
		let arr = [];
		if(matrix === 'a') {
			arr = aMatrix.slice();
			arr[row][col] = val;
			setAMatrix(arr);
		} else {
			arr = bMatrix.slice();
			arr[row][col] = val;
			setBMatrix(arr)
		}
	}

	const matrixAddition = () => {
		matrixTransform()
	}

	const matrixSubtraction = () => {
		matrixTransform()
	}

	const matrixMultiplication = () => {
		matrixTransform()
	}

	const matrixTransform = () => {

	}

	return (
		<div className='app row'>
			<div className='flex1'>
				<label>Enter value of n: </label>
				<input type='number' placeholder='value' onChange={e => setN(e.target.value)} />
				<button className='button' disabled={!n} onClick={() => setGrids()}>&#10003;</button>
				<h2>Matrix A</h2>
				{aMatrixGrid}
				<h2>Matrix B</h2>
				{bMatrixGrid}
			</div>
			<div className='flex1'>
				<h1>Operations</h1>
				<div>
					<button className='button smallMarginRight' onClick={() => matrixAddition()}>+</button>
					<button className='button smallMarginRight' onClick={() => matrixSubtraction()}>-</button>
					<button className='button' onClick={() => matrixMultiplication()}>*</button>
				</div>
			</div>
		</div>
	);
}

export default App;