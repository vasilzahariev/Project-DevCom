import styles from './index.module.css';
import { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import RendererJobCard from '../renderer-job-card';

const JobsRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.jobs.map((job, index) => {
            return (
                <RendererJobCard key={job._id} index={index} job={job} setJob={props.setJob} setUsername={props.setUsername} />
            );
        });
    }, [props.jobs]);

    return (
        <div className={styles.jobs}>
            <Grid container direction='column' justify='center' alignItems='stretch' spacing={2}>
                {renderer}
            </Grid>
        </div>
    );
}

export default JobsRenderer;
