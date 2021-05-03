import styles from './index.module.css';
import Layout from '../../components/layout';
import { useEffect, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import PageDiv from '../../components/page-div';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import JobsRenderer from '../../components/jobs-renderer';
import JobContext from '../../contexts/JobContext';
import JobCard from '../../components/job-card';
import JobsOptions from '../../components/jobs-options';
import HeaderLink from '../../components/header-link';
import UserContext from '../../contexts/UserContext';
import { useParams, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Jobs = () => {
    const configContext = useContext(ConfigContext);
    const userContex = useContext(UserContext);
    const jobContex = useContext(JobContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const params = useParams();
    const history = useHistory();

    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedJobAuthorUsername, setSelectedJobAuthorUsername] = useState('');
    const [jobs, setJobs] = useState([]);
    const [ended, setEnded] = useState(false);
    const [renderJobs, setRenderJobs] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/jobs/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setJobs(response);

            if (params.id !== undefined && selectedJob === null && selectedJobAuthorUsername === '') {
                const job = response.find(j => j._id === params.id);

                if (!job) history.push('/404');

                fetch(`${configContext.restApiUrl}/auth/u/${job.authorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(promise => promise.json()).then(response => {
                    setSelectedJob(job);
                    setSelectedJobAuthorUsername(response.username);
                });
            }

            setEnded(true);
        });
    });

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
                <PageDiv>
                    <div style={{ marginBottom: '2%' }}>
                        <h1>Jobs</h1>
                        {userContex.user.loggedIn ? <HeaderLink to='/jobs/create'>Create a Job</HeaderLink> : ''}
                    </div>
                </PageDiv>

                {isMobile ?
                    <div>
                        <JobsRenderer setJob={setSelectedJob} setUsername={setSelectedJobAuthorUsername} jobs={renderJobs} />
                    </div>
                    :
                    <Grid container direction='row' justify='center' alignItems='flex-start' spacing={2}>
                        <Grid item xs={2}><JobsOptions jobs={jobs} setRenderJobs={setRenderJobs} /></Grid>
                        <Grid item xs={4}><JobsRenderer setJob={setSelectedJob} setUsername={setSelectedJobAuthorUsername} jobs={renderJobs} /></Grid>
                        <Grid item xs={6}><JobCard /></Grid>
                    </Grid>
                }

            </JobContext.Provider>
        </Layout>
    );
}

export default Jobs;
