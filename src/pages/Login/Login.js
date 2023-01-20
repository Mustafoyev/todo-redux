import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToken } from '../../redux/token/tokenAction';
import { addUser } from '../../redux/user/userAction';

export const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post('http://localhost:8080/login', {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem('token', res.data.accessToken);
					localStorage.setItem('user', JSON.stringify(res.data.user));
					dispatch(addToken(res.data.accessToken));
					dispatch(addUser(res.data.user));
					emailRef.current.value = '';
					passwordRef.current.value = '';
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='w-50 mx-auto shadow mt-5 p-4'>
			<h1 className='text-center mb-3'>Login</h1>
			<form onSubmit={handleFormSubmit}>
				<input
					ref={emailRef}
					className='form-control mb-3'
					type='email'
					placeholder='Email'
				/>
				<input
					ref={passwordRef}
					className='form-control mb-3'
					type='password'
					placeholder='Password'
				/>
				<button className='btn btn-primary w-25' type='submit'>
					Send
				</button>
			</form>
		</div>
	);
};
