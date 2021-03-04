import logo from './logo.svg';
import './App.css';
import UserContext from './contexts/UserContext';
import { useState, useEffect, useContext } from 'react';
import getCookie from './utils/cookie';
import ConfigContext from './contexts/ConfigContext';

function App(props) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true)

	const login = (user) => {
		setUser({
			...user,
			loggedIn: true
		});

		setLoading(false);
	}

	const logout = () => {
		document.cookie = "aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		setUser({ user: null, loggedIn: false });
		setLoading(false);
	}

	useEffect(() => {
		const token = getCookie('aid');

		if (!token) {
			logout();

			return;
		}

		// TODO: Change
		fetch(`http://localhost:3001/auth/verifyToken`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authentication': token
			}
		}).then(promise => {
			return promise.json();
		}).then(response => {
			if (response.error)
				logout();
			else
				login(response.user);
		});

	}, []);

	if (loading) {
		return (<div></div>)
	} else {
		return (
			<UserContext.Provider value={{
				user,
				login,
				logout
			}}>
				<ConfigContext.Provider value={{
					restApiUrl: `http://localhost:3001`
				}}>
					{props.children}
				</ConfigContext.Provider>
			</UserContext.Provider>
		);
	}
}

export default App;
