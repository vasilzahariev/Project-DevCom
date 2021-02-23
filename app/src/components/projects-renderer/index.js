import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import RenderedProjectCard from '../rendered-project-card';

const ProjectsRenderer = props => {
    const renderer = useMemo(() => {
        return props.projects.map((project, index) => {
            return (
                <RenderedProjectCard key={project._id} index={index} project={project} />
            );
        })
    }, [props.projects]);

    return (
        <Grid container spacing={4}>
            {renderer}
        </Grid>
    );
}

export default ProjectsRenderer;
