import styles from './index.module.css';
import { useMemo, useEffect, useContext, useState } from 'react';
import RenderedProjectCard from '../rendered-project-card';
import { Grid, CircularProgress } from '@material-ui/core';
import ConfigContext from '../../contexts/ConfigContext';

const SearchProjectsRenderer = props => {
    const configContext = useContext(ConfigContext);

    const [ended, setEnded] = useState(false);
    const [projects, setProjects] = useState([]);

    const sortProjects = (a, b) => {
        const title1 = a.name.toLowerCase();
        const title2 = b.name.toLowerCase();

        if (title1 > title2) return 1;
        else if (title1 < title2) return -1;

        return 0;
    }

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {

            setProjects(response.filter(project => {
                if (project.name.toLowerCase().includes(props.searchValue)) return project;
            }).sort(sortProjects));
            setEnded(true);
        });
    }, [projects]);

    const renderer = useMemo(() => {
        return projects.map((project, index) => {
            return (
                <RenderedProjectCard key={project._id} index={index} project={project} width='60' />
            );
        })
    }, [projects]);

    if (!ended) {
        return (<CircularProgress color='inherit' />);
    }

    return (
        <Grid container justify='center' spacing={4}>
            <div style={{ textAlign: 'left' }}>
                {projects.length === 0 ? 'No Projects Found' : renderer}
            </div>
        </Grid>
    );
}

export default SearchProjectsRenderer;
