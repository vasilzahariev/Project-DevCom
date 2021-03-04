import styles from './index.module.css';
import TableRow from '../table-row';
import TableColumn from '../table-column';
import HeaderLink from '../header-link';
import TableBtn from '../table-btn';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import EditForumPostDialog from '../edit-forum-post-dialog';
import ConfigContext from '../../contexts/ConfigContext';

const ForumsPostsRow = props => {
    const configContext = useContext(ConfigContext);

    const date = new Date(Date.parse(props.post.publishedDate));

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    const view = e => {
        history.push(`/forum/f/${props.forum.name}/${props.post._id}`);
    }

    const edit = e => {
        setEditOpen(true);
    }

    const remove = async e => {
        if (!window.confirm(`Are you sure you want to delete a post with title: "${props.post.title}"?`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/forum/deletePost/${props.post._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
    }

    return (
        <TableRow>
            <TableColumn xs={1}>{props.index}</TableColumn>
            <TableColumn xs={3}>{props.post.title}</TableColumn>
            <TableColumn xs={2}>{props.forum.title}</TableColumn>
            <TableColumn xs={2}><HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink></TableColumn>
            <TableColumn xs={1}>{date.toLocaleDateString()}</TableColumn>
            <TableColumn xs={3}>
                <TableBtn color='blue' onClick={view}>View</TableBtn>
                <TableBtn color='yellow' onClick={edit}>Edit</TableBtn>
                {editOpen ? <EditForumPostDialog open={editOpen} setOpen={setEditOpen} post={props.post} /> : ''}
                <TableBtn color='red' onClick={remove}>Delete</TableBtn>
            </TableColumn>
        </TableRow>
    );
}

export default ForumsPostsRow;
