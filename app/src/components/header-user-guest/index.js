import styles from './index.module.css';
import { Grid, Button } from '@material-ui/core';
import HeaderLink from '../header-link';

const HeaderUserGuest = () => {
    return (
        <Grid container justify='flex-end' alignItems='center'>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
                <HeaderLink to='/auth/login'>Log In</HeaderLink>
            </Grid>
            <Grid item xs={3}>
                <HeaderLink to='/auth/register'>Register</HeaderLink>
            </Grid>
        </Grid>
    );
}

export default HeaderUserGuest;
