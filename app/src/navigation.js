import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeGuest from './pages/home-guest';
import Register from './pages/register';
import UserContext from './contexts/UserContext';
import Login from './pages/login';
import News from './pages/news';
import CreateArticle from './pages/create-article';
import NewsArticle from './pages/news-article';
import CreateJob from './pages/create-job';
import Jobs from './pages/jobs';
import UserProfile from './pages/user-profile';
import EditProfile from './pages/edit-profile';

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
            <Route exact path='/news' component={News} />
            <Route exact path='/news/create'>
                {userContext.user.loggedIn && (userContext.user.isJournalist || userContext.user.isAdmin) ? <CreateArticle /> : <Redirect to='/news' />}
            </Route>
            <Route exact path='/news/:path' component={NewsArticle} />
            <Route exact path='/jobs' component={Jobs} />
            <Route exact path='/jobs/create'>
                {userContext.user.loggedIn ? <CreateJob /> : <Redirect to='/auth/login' />}
            </Route>
            <Route exact path='/u/:username' component={UserProfile} />
            <Route exact path='/u/:username/settings' component={EditProfile} />
            {/* TODO: Insert 404 page here when created */}
        </Switch>
    )
}

export default Navigation;
