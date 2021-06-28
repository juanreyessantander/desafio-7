import React, { useState } from 'react';
import './App.css';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import Header from './components/Header/Header';
import CardUser from './components/CardUser/CardUser';
import axios from 'axios';

function App() {
	const [inputText, setInputText] = useState('');
	const [userData, setUserData] = useState({});
	//const [variableUser, setVariableUser] = useState(false);

	// const onChangeState = () => {
	// 	setVariableUser(!variableUser);
	// };

	const onHandleChange = (e) => {
		// console.log(e.target.value);
		setInputText(e.target.value);
	};

	const onHandleSubmit = (e) => {
		// Prevenir el comportamiento por defecto del form al hacer submit con preventDefault()
		e.preventDefault();
		// console.log(inputText);
		const userInput = inputText.toLocaleLowerCase().replace(/ /g, ''); // Sanitizar la variable
		if (userInput) {
			axios(`https://api.github.com/users/${userInput}`).then((res) =>
				// console.log(res.data)
				setUserData(res.data)
			);
			setInputText('');
		} else {
			return;
		}
	};

	return (
		<div className='App'>
			<Header />
			<div className='App-Form'>
				<form onSubmit={onHandleSubmit}>
					<InputGroup>
						<Input
							placeholder='Buscar usuario'
							value={inputText}
							onChange={onHandleChange}
						/>
						<InputGroupAddon addonType='prepend'>
							<Button>Buscar</Button>
						</InputGroupAddon>
					</InputGroup>
				</form>
			</div>
			{/* EJEMPLO 1*/}
			{/* {userData.id ? (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			) : (
				<p>Es falso</p>
			)} */}

			{/* EJEMPLO 1*/}
			{/* {userData.id ? (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			) : null} */}

			{userData.id && (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			)}

			{/* <button onClick={onChangeState}>Cambiar State</button> */}
		</div>
	);
}

export default App;
