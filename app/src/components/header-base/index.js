import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { Drawer, Grid } from '@material-ui/core';
import HeaderLink from '../header-link';
import { useMediaQuery } from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

const HeaderBase = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const [open, setOpen] = useState(false);

    return (
        <div>
            {isMobile ?
                <div>
                    <MenuIcon className={styles.menuIcon} fontSize="large" onClick={() => { setOpen(true) }} />
                    <Drawer anchor='top' open={open} onClose={() => { setOpen(false) }}>
                        <Grid className={styles.drawer} container direction='column' alignItems='center' spacing={2}>
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
                    </Drawer>
                </div>
                :
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
                </Grid>}
        </div>
    );
}

export default HeaderBase;
