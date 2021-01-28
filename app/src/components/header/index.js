import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HeaderBase from '../header-base';
import HeaderUserGuest from '../header-user-guest';
import HeaderUser from '../header-user';
import HeaderSearch from '../header-search';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

const Header = () => {
    const userContext = useContext(UserContext);

    return (
        <header className={ userContext.user.loggedIn ? '' : styles.header }>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={3}>
                    <HeaderBase />
                </Grid>
                <Grid item xs={6}>
                    <HeaderSearch />
                </Grid>
                <Grid item xs={3}>
                    { userContext.user.loggedIn ? <HeaderUser /> : <HeaderUserGuest /> }
                </Grid>
            </Grid>
        </header>
    )
}

export default Header;
