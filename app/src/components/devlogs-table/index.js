import styles from './index.module.css';
import { Grid, CircularProgress } from '@material-ui/core';
import { useContext, useState, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import DevlogRow from '../devlog-row';

const DevlogsTalbe = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [devlogs, setDevlogs] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/getUserDevlogs/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setDevlogs(response.devlogs);
            setEnded(true);
        });
    }, [devlogs]);

    const renderer = useMemo(() => {
        return devlogs.map((devlog, index) => {
            return (
                <DevlogRow key={devlog._id} index={index} devlog={devlog} showUser={props.showUser} />
            );
        });
    }, [devlogs]);

    if (!ended) {
        return (
            <CircularProgress color='inherit' />
        );
    }

    return (
        <div>
            <Grid className={styles.table} container spacing={1}>
                <Grid className={styles.head} item xs={12}>
                    <Grid container>
                        <Grid className={styles.value} item xs={1}><b>#</b></Grid>
                        <Grid className={styles.value} item xs={props.showUser ? 2 : 3}><b>Title</b></Grid>
                        {props.showUser ? <Grid className={styles.value} item xs={1}><b>Username</b></Grid> : ''}
                        <Grid className={styles.value} item xs={2}><b>Project</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Status</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Published Date</b></Grid>
                        <Grid className={styles.value} item xs={4}><b>Actions</b></Grid>
                    </Grid>
                </Grid>
                {renderer}
            </Grid>
        </div>
    );
}

export default DevlogsTalbe;
