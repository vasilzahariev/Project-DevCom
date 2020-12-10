import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import HeaderLink from '../header-link';

const HeaderBase = () => {
    return (
        <Grid className={styles.container} container alignItems='center' spacing={4}>
            <Grid item>
                <HeaderLink to='/'>Home</HeaderLink>
            </Grid>
            <Grid item>
                <HeaderLink to='/news'>News</HeaderLink>
            </Grid>
            <Grid item>
                <HeaderLink to='/forum'>Forum</HeaderLink>
            </Grid>
            <Grid item>
                <HeaderLink to='/jobs'>Jobs</HeaderLink>
            </Grid>
        </Grid>
    );
}

export default HeaderBase;
