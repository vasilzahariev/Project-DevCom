import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeGuest from './pages/home-guest';
import Register from './pages/register';
import UserContext from './UserContext';
import Login from './pages/login';

const Navigation = () => {
    const userContext = useContext(UserContext);

    return (
        <Switch>
            <Route exact path='/' component={HomeGuest} />
            <Route exact path='/auth/register'>
                {userContext.user.loggedIn ? <Redirect to='/' /> : <Register />}
            </Route>
            <Route exact path='/auth/login'>
                {userContext.user.loggedIn ? <Redirect to='/' /> : <Login />}
            </Route>
            {/* TODO: Insert 404 page here when created */}
        </Switch>
    )
}

export default Navigation;
