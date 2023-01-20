import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToken } from '../../redux/token/tokenAction';
import { addUser } from '../../redux/user/userAction';

export const Register = () => {
	const firsNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post('http://localhost:8080/register', {
				first_name: firsNameRef.current.value,
				last_name: lastNameRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					localStorage.setItem('token', res.data.accessToken);
					localStorage.setItem('user', JSON.stringify(res.data.user));
					dispatch(addToken(res.data.accessToken));
					dispatch(addUser(res.data.user));
					firsNameRef.current.value = '';
					lastNameRef.current.value = '';
					emailRef.current.value = '';
					passwordRef.current.value = '';
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='w-50 mx-auto shadow mt-5 p-4'>
			<h1 className='text-center mb-3'>Register</h1>
			<form onSubmit={handleFormSubmit}>
				<input
					ref={firsNameRef}
					className='form-control mb-3'
					type='text'
					placeholder='First Name'
				/>
				<input
					ref={lastNameRef}
					className='form-control mb-3'
					type='text'
					placeholder='Last Name'
				/>
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
