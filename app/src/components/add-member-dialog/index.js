import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useState, useContext } from 'react';
import Input from '../input';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const AddMemberDialog = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');

    const onUsernameChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) setUsernameErr('Username should be at least 1 character long');
        else setUsernameErr ('');

        setUsername(val);
    }

    const onClearClose = e => {
        props.setOpen(false);
        setUsername('');
        setUsernameErr('');
    }

    const action = async e => {
        if (username.length === 0) {
            setUsernameErr('Username should be at least 1 character long');

            return;
        }

        const body = {
            projectId: props.projectId,
            username,
        }

        const promise = await fetch(`${configContext.restApiUrl}/project/addMember`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status && response.err) {
            setUsernameErr(response.err);
        } else if (!response.status) {
            history.push('/500');
        } else {
            onClearClose();
        }
    }

    return (
        <DialogWindow open={props.open} action={action} actionName='Add' title='Add a Member' onClearClose={onClearClose}>
            <Input label="Member's Username" placeholder="Member's Username" value={username} onChange={onUsernameChange} err={usernameErr} />
        </DialogWindow>
    );
}

export default AddMemberDialog;
