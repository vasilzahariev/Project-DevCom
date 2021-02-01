import styles from './index.module.css';
import Layout from '../../components/layout';
import { useEffect, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import PageDiv from '../../components/page-div';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import JobsRenderer from '../../components/jobs-renderer';
import JobContext from '../../contexts/JobContext';
import JobCard from '../../components/job-card';

const Jobs = () => {
    const configContext = useContext(ConfigContext);
    const jobContext = useContext(JobContext);

    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedJobAuthorUsername, setSelectedJobAuthorUsername] = useState('');
    const [jobs, setJobs] = useState([]);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/jobs/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setJobs(response);
            setEnded(true);
        });
    }, [jobs]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Layout>
            <JobContext.Provider value={{ job: selectedJob, username: selectedJobAuthorUsername }}>
                <PageDiv><h1>Jobs</h1></PageDiv>

                <Grid container direction='row' justify='center' alignItems='flex-start' spacing={2}>
                    <Grid item xs={1}>Options</Grid>
                    <Grid item xs={4}><JobsRenderer setJob={setSelectedJob} setUsername={setSelectedJobAuthorUsername} jobs={jobs} /></Grid>
                    <Grid item xs={7}><JobCard /></Grid>
                </Grid>
            </JobContext.Provider>
        </Layout>
    );
}

export default Jobs;
