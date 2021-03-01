import styles from './index.module.css';
import Table from '../table';
import TableHead from '../table-head';
import TableColumn from '../table-column';
import { useContext, useState, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import UsersRow from '../users-row';

const UsersTable = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUsers(response);
        });
    }, [users]);

    const sortUsers = (a, b) => {
        const val1 = a.username.toLowerCase();
        const val2 = b.username.toLowerCase();

        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;

        return 0;
    }

    const renderer = useMemo(() => {
        return users.sort(sortUsers).map((user, index) => {
            return (<UsersRow key={user._id} index={index} user={user} />);
        });
    }, [users]);

    return (
        <Table>
            <TableHead>
                <TableColumn xs={1}><b>#</b></TableColumn>
                <TableColumn xs={1}><b>Profile Picture</b></TableColumn>
                <TableColumn xs={2}><b>Username</b></TableColumn>
                <TableColumn xs={2}><b>Full Name</b></TableColumn>
                <TableColumn xs={1}><b>Role</b></TableColumn>
                <TableColumn xs={5}><b>Actions</b></TableColumn>
            </TableHead>
            {renderer}
        </Table>
    );
}

export default UsersTable;
