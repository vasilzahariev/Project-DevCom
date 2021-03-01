import styles from './index.module.css';
import Layout from '../../components/layout';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import ConfigContext from '../../contexts/ConfigContext';
import ProjectInfo from '../../components/project-info';
import DevLogs from '../../components/devlogs';

const Project = () => {
    const configContext = useContext(ConfigContext);

    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [project, setProject] = useState(null);
    const [devLogs, setDevLogs] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/p/${params.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) {
                history.push('/404');

                return;
            }

            setProject(response.project);
            setDevLogs(response.devLogs);
            setMembers(response.members);
            setEnded(true);
        });
    }, [project]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <Layout>
            <div className={styles.project}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={8}>
                        <DevLogs project={project} devlogs={devLogs} members={members} selectedDevlogId={params.selectedDevlogId} />
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectInfo project={project} devLogs={devLogs.length} members={members} />
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}

export default Project;
