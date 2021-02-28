import styles from './index.module.css';
import { CircularProgress, Grid } from '@material-ui/core';
import { useMemo, useContext, useState, useEffect } from 'react';
import ALink from '../link';
import SimpleTextBtn from '../simple-text-btn';
import CancelIcon from '@material-ui/icons/Cancel';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import DialogWindow from '../dialog-window';
import Input from '../input';
import HeaderLink from '../header-link';

const AddModDialog = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUsers(response);
            setSelectedUsers(props.mods.map(mod => mod.user.username));
            setEnded(true);
        });
    }, []);

    const onUsernameChange = e => {
        const val = e.target.value;

        setSuggestions(users.filter(u => {
            if (u.username.toLowerCase().startsWith(val.toLowerCase()) && !selectedUsers.includes(u.username) && userContext.user.username !== u.username) {
                return u;
            }
        }));

        setUsername(val);
    }

    const onUsernameClick = username => {
        setSelectedUsers(selectedUsers => [...selectedUsers, username]);
        setUsername('');
        setSuggestions([]);
    }

    const renderer = useMemo(() => {
        return suggestions.map((u, index) => {
            return (<p key={u._id} index={index} className={styles.suggestion} onClick={() => onUsernameClick(u.username)}>{u.username}</p>);
        })
    }, [suggestions]);

    const removeSelectedUser = username => {
        setSelectedUsers(selectedUsers.filter(u => u !== username));
    }

    const getUserId = username => {
        return users.find(u => u.username === username)._id;
    }

    const renderSelectedUsers = useMemo(() => {
        return selectedUsers.map((username, index) => {
            return (
                <div className={styles.selectedUser}>
                    <Grid container key={username} index={index} justify="space-between" alignItems="center">
                        <Grid item><HeaderLink to={`/u/${username}`}>{username}</HeaderLink></Grid>
                        <Grid item>{props.forum.ownerId !== getUserId(username) ? <SimpleTextBtn onClick={() => removeSelectedUser(username)}><CancelIcon /></SimpleTextBtn> : ''}</Grid>
                    </Grid>
                </div>
            );
        })
    }, [selectedUsers]);

    const close = e => {
        props.setOpen(false);
        setUsername('');
        setSuggestions([]);
        setSelectedUsers([]);
    }

    const add = async e => {
        e.preventDefault();

        const body = {
            forumId: props.forum._id,
            users: selectedUsers
        }

        const promise = await fetch(`${configContext.restApiUrl}/forum/addMods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');

        close();
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Add Moderators' action={add} actionName='Add'>
            {ended ? <div>
                <Input label='Username' placeholder='Username' value={username} onChange={onUsernameChange} />
                {username ?
                    <div className={styles.marginUp}>
                        <div style={{ height: suggestions.length < 4 ? 'max-content' : '200px' }} className={styles.suggestions}>
                            {suggestions.length === 0 ? <p>No Options</p> : renderer}
                        </div>
                    </div> : ''}
                {selectedUsers.length === 0 ? '' :
                    <div className={styles.marginUp}>
                        <div style={{ height: selectedUsers.length < 4 ? 'max-content' : '200px' }} className={styles.selected}>
                            <p>Selected Users:</p>
                            {renderSelectedUsers}
                        </div>
                    </div>
                }
            </div> : <CircularProgress color='inherit' />}
        </DialogWindow>
    );
}

export default AddModDialog;
