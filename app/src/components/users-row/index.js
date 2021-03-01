import styles from './index.module.css';
import TableRow from '../table-row';
import TableColumn from '../table-column';
import UserAvatar from '../user-avatar';
import TableBtn from '../table-btn';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import ConfigContext from '../../contexts/ConfigContext';

const UsersRow = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const view = e => {
        history.push(`/u/${props.user.username}`);
    }

    const setRole = async (role, status) => {
        const body = {
            id: props.user._id,
            role,
            status
        };

        const promise = await fetch(`${configContext.restApiUrl}/auth/setRole`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <TableRow>
            <TableColumn xs={1}>{props.index}</TableColumn>
            <TableColumn xs={1}><UserAvatar user={props.user} /></TableColumn>
            <TableColumn xs={2}>{props.user.username}</TableColumn>
            <TableColumn xs={2}>{props.user.fullName}</TableColumn>
            <TableColumn xs={1}>{props.user.isOwner ? 'Owner' : props.user.isAdmin ? 'Admin' : (props.user.isJournalist ? 'Journalist' : (props.user.isVerified ? 'Verified User' : 'User'))}</TableColumn>
            <TableColumn xs={5}>
                <TableBtn color='blue' onClick={view}>View</TableBtn>
                {!props.user.isOwner ? <TableBtn color={props.user.isVerified ? 'red' : 'green'} onClick={() => { setRole('verify', !props.user.isVerified) }}>{props.user.isVerified ? 'Unverify' : 'Verify'}</TableBtn> : ''}
                {!props.user.isOwner ? <TableBtn color={props.user.isJournalist ? 'red' : ''} onClick={() => { setRole('journalist', !props.user.isJournalist) }}>{props.user.isJournalist ? 'Remove Journalist' : 'Make Journalist'}</TableBtn> : ''}
                {!props.user.isOwner && userContext.user.isOwner ? <TableBtn color={props.user.isAdmin ? 'red' : ''} onClick={() => { setRole('admin', !props.user.isAdmin) }}>{props.user.isAdmin ? 'Remove Admin' : 'Make Admin'}</TableBtn> : ''}
            </TableColumn>
        </TableRow>
    );
}

export default UsersRow;
