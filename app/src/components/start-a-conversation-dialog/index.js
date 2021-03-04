import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import React, { useMemo } from 'react';
import { useEffect, useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { CircularProgress, TextField, Checkbox, Grid } from '@material-ui/core';
import Input from '../input';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import SimpleTextBtn from '../simple-text-btn';
import ALink from '../link';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import HeaderLink from '../header-link';

const StartAConversationDialog = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
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
            setEnded(true);
        });
    }, []);

    const onNameChange = e => {
        const val = e.target.value;

        setName(val);
    }

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

    const renderSelectedUsers = useMemo(() => {
        return selectedUsers.map((username, index) => {
            return (
                <div className={styles.selectedUser}>
                    <Grid container key={username} index={index} justify="space-between" alignItems="center">
                        <Grid item><HeaderLink to={`/u/${username}`}>{username}</HeaderLink></Grid>
                        <Grid item><SimpleTextBtn onClick={() => removeSelectedUser(username)}><CancelIcon /></SimpleTextBtn></Grid>
                    </Grid>
                </div>
            );
        })
    }, [selectedUsers]);

    const close = e => {

        props.setOpen(false);
        setName('');
        setUsername('');
        setSuggestions([]);
        setSelectedUsers([]);
    }

    const start = async e => {
        e.preventDefault();

        const body = {
            creatorId: userContext.user._id,
            name,
            usernames: [userContext.user.username, ...selectedUsers]
        };

        const promise = await fetch(`${configContext.restApiUrl}/chat/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
        else props.setSelectedChatId(response.chatId);

        close();
    }

    if (!ended) {
        return (
            <CircularProgress color='inherit' />
        );
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Start a Conversation' action={start} actionName='Start'>
            <Input label='Name' placeholder='Name' value={name} onChange={onNameChange} />
            <div>
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
            </div>
        </DialogWindow>
    );
}

export default StartAConversationDialog;
