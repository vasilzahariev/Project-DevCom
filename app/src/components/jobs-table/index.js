import styles from './index.module.css';
import { Grid, CircularProgress } from '@material-ui/core';
import { useState, useEffect, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import JobRow from '../job-row';

const JobsTable = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/jobs/getUserJobs/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setJobs(response.jobs);
            setEnded(true);
        });
    }, [jobs]);

    const renderer = useMemo(() => {
        return jobs.map((job, index) => {
            return (
                <JobRow key={job._id} index={index} job={job} showUser={props.showUser} />
            );
        });
    }, [jobs]);

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
                        <Grid className={styles.value} item xs={2}><b>Name</b></Grid>
                        {props.showUser ? <Grid className={styles.value} item xs={1}><b>Username</b></Grid> : ''}
                        <Grid className={styles.value} item xs={props.showUser ? 1 : 2}><b>Type</b></Grid>
                        <Grid className={styles.value} item xs={2}><b>Published Date</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Status</b></Grid>
                        <Grid className={styles.value} item xs={4}><b>Actions</b></Grid>
                    </Grid>
                </Grid>
                {renderer}
            </Grid>
        </div>
    );
}

export default JobsTable;
