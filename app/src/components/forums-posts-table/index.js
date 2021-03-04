import styles from './index.module.css';
import Table from '../table';
import TableHead from '../table-head';
import TableColumn from '../table-column';
import { useContext, useState, useMemo, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import ForumsPostsRow from '../forums-posts-row';
import { useHistory } from 'react-router-dom';

const ForumsPostsTable = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/getUserPosts/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setPosts(response.posts);
        });
    }, [posts]);

    const renderer = useMemo(() => {
        return posts.map((pu, index) => {
            return (<ForumsPostsRow key={pu.post._id} index={index} post={pu.post} user={pu.user} forum={pu.forum} />);
        });
    }, [posts]);

    return (
        <Table>
            <TableHead>
                <TableColumn xs={1}><b>#</b></TableColumn>
                <TableColumn xs={3}><b>Title</b></TableColumn>
                <TableColumn xs={2}><b>Forum</b></TableColumn>
                <TableColumn xs={2}><b>Author</b></TableColumn>
                <TableColumn xs={1}><b>Published Date</b></TableColumn>
                <TableColumn xs={3}><b>Actions</b></TableColumn>
            </TableHead>
            {renderer}
        </Table>
    );
}

export default ForumsPostsTable;
