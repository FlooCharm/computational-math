import React, { useState, useEffect } from 'react';
import './App.css';

function App(props) {
	let [aMatrixGrid, setAMatrixGrid] = useState([]);
	let [bMatrixGrid, setBMatrixGrid] = useState([]);
	let [resultMatrixGrid, setResultMatrixGrid] = useState([]);
	let [aMatrix, setAMatrix] = useState([]);
	let [bMatrix, setBMatrix] = useState([]);
	let [resultMatrix, setResultMatrix] = useState([]);
	let [n, setN] = useState();
	let [aArr, setAArr] = useState([]);
	let [bArr, setBArr] = useState([]);

	const setGrid = (matrix) => {
		let arr;
		if(matrix === 'a') arr = aMatrix
		else if(matrix === 'b') arr = bMatrix
		else if(matrix === 'r') arr = resultMatrix
		let content = arr.map((row, rIndex) => {
			return (
				<div key={rIndex}>
					{ renderRow(matrix, row, rIndex) }
				</div>
			)
		})
		if(matrix === 'a') setAMatrixGrid(content)
		else if(matrix === 'b') setBMatrixGrid(content)
		else if(matrix === 'r') setResultMatrixGrid(content)
	}
	
	useEffect(() => {
		setGrid('a');
	}, [aMatrix])
	useEffect(() => {
		setGrid('b');
	}, [bMatrix])
	useEffect(() => {
		setGrid('r');
	}, [resultMatrix])

	const setArray = () => {
		let arr = Array(parseInt(n)).fill(0);
		for(let j = 0; j < n; j++)
			arr[j] = Array(parseInt(n)).fill(0)
		return arr;
	}

	const setGrids = () => {
		setAMatrix(setArray())
		setBMatrix(setArray())
		setResultMatrix(setArray())
	}


	const renderRow = (matrix, row, rIndex) => {
		return row.map((col, cIndex) => {
			if(matrix !== 'r') {
				return (
					<input
						type='number'
						className='matrixCell'
						placeholder={`${rIndex}, ${cIndex}`}
						key={`${rIndex}, ${cIndex}`}
						onChange={e => changeValue(matrix, rIndex, cIndex, e.target.value)}
					/>
				)
			} else {
				return (
					<input
						type='number'
						className='matrixCell'
						placeholder={`${rIndex}, ${cIndex}`}
						key={`${rIndex}, ${cIndex}`}
						value={resultMatrix[rIndex][cIndex]}
						readOnly
					/>
				)
			}
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

	const transformMatrixes = () => {
		let aArr = matrixTransform(aMatrix)
		let bArr = matrixTransform(bMatrix)
		setAArr(aArr)
		setBArr(bArr)
	}

	const matrixAddition = () => {
		setResultMatrix(matrixInverseTransform(aArr.map((x, index) => x + bArr[index])))
	}

	const matrixSubtraction = () => {
		setResultMatrix(matrixInverseTransform(aArr.map((x, index) => x - bArr[index])))
	}

	const matrixMultiplication = () => {
		
	}

	const matrixTransform = (matrix) => {
		let arr = []
		for(let i = 0; i < n; i++) {
			for(let j = 0; j < n; j++) {
				arr[i * n + j] = parseInt(matrix[i][j])
			}
		}
		return arr;
	}

	const matrixInverseTransform = (arr) => {
		let matrix = setArray();
		arr.forEach((val, index) => {
			let i = Math.floor(index/n)
			let j = index % n
			matrix[i][j] = val
		})
		return matrix;
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
					<button className='button smallMarginRight' onClick={() => {transformMatrixes();matrixAddition()}}>+</button>
					<button className='button smallMarginRight' onClick={() => {transformMatrixes();matrixSubtraction()}}>-</button>
					<button className='button' onClick={() => {transformMatrixes();matrixMultiplication()}}>*</button>
				</div>
				<div>
					<p>Vector A: [{aArr.toString()}]</p>
					<p>Vector B: [{bArr.toString()}]</p>
					<h3>Matrix result</h3>
					{resultMatrixGrid}
				</div>
			</div>
		</div>
	);
}

export default App;