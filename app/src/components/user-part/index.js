import styles from './index.module.css';
import { useEffect, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { CircularProgress, Grid, Avatar } from '@material-ui/core';
import UserLinks from '../user-links';
import UserContext from '../../contexts/UserContext';
import HeaderLink from '../header-link';
import UserAvatar from '../user-avatar';

const UserPart = (props) => {
    const userContext = useContext(UserContext);
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
    }, [props.username]);

    if (!ended) {
        return (<CircularProgress color="inherit" />);
    }

    return (
        <div className={styles.card}>
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <UserAvatar user={user} size={10} />
                </Grid>
                <Grid item xs={2}>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item><HeaderLink to={`/u/${user.username}`}>@{user.username}</HeaderLink></Grid>
                        <Grid item>{user.fullName}</Grid>
                        <Grid item>{user.email}</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <p className={styles.bio}>{user.bio ? user.bio : 'No bio...'}</p>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={1}>
                    {userContext.user && userContext.user.loggedIn && userContext.user.username === props.username ? <HeaderLink to={`/u/${props.username}/settings`}>Edit Profile</HeaderLink> : 'BTN'}
                </Grid>
            </Grid>
            <div className={styles.links}>
                <UserLinks userLinks={userLinks} />
            </div>
        </div>
    );
}

export default UserPart;
