import { Switch, Route, Redirect } from 'react-router-dom';
import HomeGuest from './pages/home-guest';

const Navigation = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomeGuest} />
            {/* TODO: Insert 404 page here when created */}
        </Switch>
    )
}

export default Navigation;
