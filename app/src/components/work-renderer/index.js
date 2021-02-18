import styles from './index.module.css';
import { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import RenderedWorkCard from '../rendered-work-card';

const WorkRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.workExperiences.map((work, index) => {
            return (
                <RenderedWorkCard key={work._id} index={index} work={work} />
            );
        });
    }, [props.workExperiences]);

    return (
        <Grid container spacing={4}>
            {renderer}
        </Grid>
    );
}

export default WorkRenderer;
