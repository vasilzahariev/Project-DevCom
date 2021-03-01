import styles from './index.module.css';
import TableRow from '../table-row';
import TableColumn from '../table-column';
import ForumIcon from '../forum-icon';
import HeaderLink from '../header-link';
import TableBtn from '../table-btn';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import EditForumDialog from '../edit-forum-dialog';
import ConfigContext from '../../contexts/ConfigContext';

const ForumsRow = props => {
    const configContext = useContext(ConfigContext);

    const date = new Date(Date.parse(`${props.forum.createdDate}`));

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    const view = e => {
        history.push(`/forum/f/${props.forum.name}`);
    }

    const edit = e => {
        setEditOpen(true);
    }

    const remove = async e => {
        if (!window.confirm(`Are you sure you want to delete a forum with title: "${props.forum.title}"?`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/forum/delete/${props.forum._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <TableRow>
            <TableColumn xs={1}>{props.index}</TableColumn>
            <TableColumn xs={1}><ForumIcon iconUrl={props.forum.iconUrl} size={7} /></TableColumn>
            <TableColumn xs={1}></TableColumn>
            <TableColumn xs={props.showUser ? 2 : 3}>{props.forum.title}</TableColumn>
            <TableColumn xs={props.showUser ? 1 : 2}>{props.forum.name}</TableColumn>
            {props.showUser ? <TableColumn xs={2}><HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink></TableColumn> : ''}
            <TableColumn xs={1}>{date.toLocaleDateString()}</TableColumn>
            <TableColumn xs={3}>
                <TableBtn color='blue' onClick={view}>View</TableBtn>
                <TableBtn color='yellow' onClick={edit}>Edit</TableBtn>
                {editOpen ? <EditForumDialog open={editOpen} setOpen={setEditOpen} forum={props.forum} /> : ''}
                <TableBtn color='red' onClick={remove}>Delete</TableBtn>
            </TableColumn>
        </TableRow>
    );
}

export default ForumsRow;
