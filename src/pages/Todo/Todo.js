import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { todoErr, todoFetch, todoLoading } from '../../redux/todo/todoAction';
import { removeToken } from '../../redux/token/tokenAction';
import { userRemove } from '../../redux/user/userAction';

export const Todo = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.todo.data);
	const inpRef = useRef();

	const handleLogOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(removeToken());
		dispatch(userRemove());
	};

	const handleSendTodo = () => {
		axios
			.post('http://localhost:8080/todos', {
				todo: inpRef.current.value,
				status: false,
			})
			.then((res) => {
				if (res.status === 201) {
					inpRef.current.value = '';
					getTodos();
				}
			})
			.catch((err) => console.log(err));
	};

	const getTodos = () => {
		dispatch(todoLoading());
		axios
			.get('http://localhost:8080/todos')
			.then((res) => {
				const todos = res.data;
				dispatch(todoFetch(todos));
			})
			.catch((err) => dispatch(todoErr(err.message)));
	};

	useEffect(() => {
		getTodos();
	}, []);

	const handleGetStatus = (id, todo, status) => {
		axios
			.put('http://localhost:8080/todos/' + id, { todo: todo, status: !status })
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((err) => console.log(err));
	};

	const handleEditTodo = (id, name) => {
		const editer = prompt('Edit todo', name);
		axios
			.put('http://localhost:8080/todos/' + id, { todo: editer })
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteTodo = (id) => {
		axios
			.delete('http://localhost:8080/todos/' + id)
			.then((res) => {
				if (res.status === 200) {
					getTodos();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<button
				onClick={handleLogOut}
				className='btn btn-danger display-block m-2'>
				Log Out
			</button>
			<h1 className='text-center'>Todo</h1>
			<div className='w-50 mt-2 shadow p-3 mx-auto rounded-pill'>
				<div className='input-group'>
					<input
						ref={inpRef}
						className='form-control'
						type='text'
						placeholder='Add todo'
					/>
					<button onClick={handleSendTodo} className='btn btn-success'>
						Send
					</button>
				</div>
			</div>
			{state.length ? (
				<ul className='w-50 mx-auto mt-4 p-0 list-unstyled'>
					{state.map((el) => (
						<li
							className='d-flex align-items-center mb-3 p-3 border-bottom'
							key={el.id}>
							<span className='m-0 me-3 h6'>{el.id}</span>
							<input
								onClick={() => handleGetStatus(el.id, el.todo, el.status)}
								className='me-3 form-check-input'
								type='checkbox'
								defaultChecked={el.status}
							/>
							<p
								className={
									el.status ? 'text-decoration-line-through m-0 h6' : 'm-0 h6'
								}>
								{el.todo}
							</p>
							<div className='ms-auto'>
								<button
									onClick={() => handleEditTodo(el.id, el.todo)}
									className='me-3 btn btn-warning'>
									Edit
								</button>
								<button
									onClick={() => handleDeleteTodo(el.id)}
									className='btn btn-danger'>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<Loading />
			)}
		</div>
	);
};
