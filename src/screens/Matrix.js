import React, { useState, useEffect } from 'react';
import Gist from 'react-gist';
import '../App.css';
import { Link } from "react-router-dom";

function Matrix(props) {
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
		let arr = Array(n).fill(0);
		for(let j = 0; j < n; j++)
			arr[j] = Array(n).fill(0)
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
		let arr = Array(n*n).fill(0)
		for(let i = 0; i < n*n; i++) {
			let x = i % n;
			for(let j = Math.floor(i/n)*n; j < n + Math.floor(i/n)*n; j++) {
				arr[i] = arr[i] + parseInt(aArr[j]) * parseInt(bArr[x])
				x+=n;
			}
		}
		setResultMatrix(matrixInverseTransform(arr))
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
		<React.Fragment>
			<div className='app'>
				<div className='row alignItemsCenter'>
					<div className='backBtn smallMarginRight'>
						<Link to='/'>{'< back'}</Link>
					</div>
					<h1 className='noMargin'>Matrix Operations</h1>
				</div>
				<div className='row'>
					<div className='flex1'>
						<div>
							<label>Enter value of n: </label>
							<input type='number' placeholder='value' onChange={e => setN(parseInt(e.target.value))} />
							<button className='button' disabled={!n} onClick={() => setGrids()}>&#10003;</button>
							<div className='row'>
								<div className='flex1'>
									<h2>Matrix A</h2>
									{aMatrixGrid}
								</div>
								<div className='flex1'>
									<h2>Matrix B</h2>
									{bMatrixGrid}
								</div>
							</div>
						</div>
						<div>
							<h1>Operations</h1>
							<div>
								<button className='button smallMarginRight' onClick={() => transformMatrixes()}>Transform</button>
								<button className='button smallMarginRight' disabled={!aArr.length || !bArr.length} onClick={() => matrixAddition()}>+</button>
								<button className='button smallMarginRight' disabled={!aArr.length || !bArr.length} onClick={() => matrixSubtraction()}>-</button>
								<button className='button' disabled={!aArr.length || !bArr.length} onClick={() => matrixMultiplication()}>*</button>
							</div>
							<div>
								<p>Vector A: [{aArr.toString()}]</p>
								<p>Vector B: [{bArr.toString()}]</p>
								<h3>Matrix result</h3>
								{resultMatrixGrid}
							</div>
						</div>
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

export default Matrix;