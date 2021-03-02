import styles from './index.module.css';
import { useState, useMemo, useEffect, useContext } from 'react';
import RendererJobCard from '../renderer-job-card';
import { Grid, CircularProgress } from '@material-ui/core';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const SearchJobsRenderer = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/jobs/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setJobs(response.filter(job => {
                if (job.name.toLowerCase().includes(props.searchValue)) return job;
            }));
            setEnded(true);
        });
    });

    const renderer = useMemo(() => {
        return jobs.map((job, index) => {
            return (
                <RendererJobCard key={job._id} index={index} job={job} setJob={(job) => { history.push(`/jobs/${job._id}`) }} setUsername={(username) => { }} />
            );
        });
    }, [jobs]);

    if (!ended) {
        return (
            <CircularProgress color="inherit" />
        );
    }

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <Grid container direction='column' justify='center' alignItems='stretch' spacing={2}>
                {jobs.length === 0 ? 'No Jobs Found' : renderer}
            </Grid>
        </div>
    );
}

export default SearchJobsRenderer;
