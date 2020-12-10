import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HeaderBase from '../header-base';
import HeaderUserGuest from '../header-user-guest';
import HeaderUser from '../header-user';
import HeaderSearch from '../header-search';

const Header = () => {
    return (
        <header className={true ? '' : styles.header}> {/* TODO: Change depending on if the user is logged */}
            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={3}>
                    <HeaderBase />
                </Grid>
                <Grid item xs={6}>
                    <HeaderSearch />
                </Grid>
                <Grid item xs={3}>
                    {/* TODO: Add user verification which checks if there is a user in the user context and show the proper User Header Part */}
                    {/* <HeaderUserGuest /> */}
                    {/* <HeaderUser /> */}
                    <HeaderUser />
                </Grid>
            </Grid>
        </header>
    )
}

export default Header;
