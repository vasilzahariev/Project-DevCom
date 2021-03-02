import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useState, useContext, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserAvatar from '../user-avatar';
import HeaderLink from '../header-link';

const SearchUsersRenderer = props => {
    const configContext = useContext(ConfigContext);

    const [users, setUsers] = useState([]);

    const sortUsers = (a, b) => {
        const username1 = a.username.toLowerCase();
        const username2 = b.username.toLowerCase();

        if (username1 > username2) return 1;
        else if (username1 < username2) return -1;

        return 0;
    }

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUsers(response.filter(user => {
                if (user.username.toLowerCase().includes(props.searchValue) || user.fullName.toLowerCase().includes(props.searchValue)) return user;
            }).sort(sortUsers));
        });
    }, [users]);

    const renderer = useMemo(() => {
        return users.map((user, index) => {
            return (
                <Grid key={user._id} index={index} item>
                    <HeaderLink to={`/u/${user.username}`}>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item>
                                <UserAvatar user={user} size={6} />
                            </Grid>
                            <Grid item>
                                {user.username}
                            </Grid>
                        </Grid>
                    </HeaderLink>
                </Grid>
            );
        })
    }, [users]);

    return (
        <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
            {renderer}
        </Grid>
    );
}

export default SearchUsersRenderer;
