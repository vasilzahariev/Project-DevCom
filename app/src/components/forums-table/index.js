import styles from './index.module.css';
import { useState, useContext, useEffect, useMemo } from 'react';
import Table from '../table';
import TableHead from '../table-head';
import TableColumn from '../table-column';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import ForumsRow from '../forums-row';
import { CircularProgress } from '@material-ui/core';

const ForumsTable = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [forums, setForums] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/getUserForums/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setForums(response.forums);
            setEnded(true);
        });
    }, [forums]);

    const renderer = useMemo(() => {
        return forums.map((fu, index) => {
            return (<ForumsRow key={fu.forum._id} index={index} forum={fu.forum} user={fu.user} showUser={props.showUser} />)
        });
    }, [forums]);

    if (!ended) {
        return (<CircularProgress color='inherit' />);
    }

    return (
        <Table>
            <TableHead>
                <TableColumn xs={1}><b>#</b></TableColumn>
                <TableColumn xs={2}><b>Icon</b></TableColumn>
                <TableColumn xs={props.showUser ? 2 : 3}><b>Title</b></TableColumn>
                <TableColumn xs={props.showUser ? 1 : 2}><b>Name</b></TableColumn>
                {props.showUser ? <TableColumn xs={2}><b>Owner</b></TableColumn> : ''}
                <TableColumn xs={1}><b>Created Date</b></TableColumn>
                <TableColumn xs={3}><b>Actions</b></TableColumn>
            </TableHead>
            {renderer}
        </Table>
    );
}

export default ForumsTable;
