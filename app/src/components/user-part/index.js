import styles from './index.module.css';
import { useEffect, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { CircularProgress, Grid } from '@material-ui/core';
import UserLinks from '../user-links';

const UserPart = (props) => {
    const configContext = useContext(ConfigContext);

    const [user, setUser] = useState(null);
    const [userLinks, setUserLinks] = useState(null);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/getUserByUsername/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUser(response.user);
            setUserLinks(response.userLinks);
            setEnded(true);
        });
    }, []);

    if (!ended) {
        return (<CircularProgress color="inherit" />);
    }

    return (
        <div className={styles.card}>
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <img className={styles.ppf} src={user.profilePictureUrl} alt='ppf' />
                </Grid>
                <Grid item xs={1}>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item>@{user.username}</Grid>
                        <Grid item>{user.fullName}</Grid>
                        <Grid item>{user.email}</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <p className={styles.bio}>{user.bio ? user.bio : 'No bio...'}</p>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}>
                    BTN
                </Grid>
            </Grid>
            <div className={styles.links}>
                <UserLinks userLinks={userLinks} />
            </div>
        </div>
    );
}

export default UserPart;
