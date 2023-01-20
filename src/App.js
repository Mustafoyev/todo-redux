import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Todo } from './pages/Todo/Todo';
import { addToken } from './redux/token/tokenAction';
import { addUser } from './redux/user/userAction';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token.token);

	useEffect(() => {
		dispatch(addToken(localStorage.getItem('token')));
		dispatch(addUser(JSON.parse(localStorage.getItem('user'))));
	}, []);

	if (token) {
		return (
			<Routes>
				<Route path='/' element={<Todo />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}

export default App;
