import styles from './index.module.css';
import PageDiv from '../page-div';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import SimpleTextBtn from '../simple-text-btn';
import CreateProjectDialog from '../create-project-dialog';
import ConfigContext from '../../contexts/ConfigContext';
import { CircularProgress } from '@material-ui/core';
import ProjectsRenderer from '../projects-renderer';

const UserProjects = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const [ended, setEnded] = useState(false);
    const [open, setOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/u/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {

            setProjects(response);
            setEnded(true);
        });
    }, [projects]);

    if (!ended) {
        return (<PageDiv><CircularProgress color='inherit' /></PageDiv>);
    }

    return (
        <div>
            <PageDiv>
                <div>
                    {userContext.user && userContext.user.loggedIn && userContext.user.username === props.username ? <SimpleTextBtn onClick={() => setOpen(true)}>Add Project</SimpleTextBtn> : ''}
                </div>

                {userContext.user && userContext.user.loggedIn && userContext.user.username === props.username ? <CreateProjectDialog username={props.username} open={open} setOpen={setOpen} /> : ''}

            </PageDiv>

            <div className={styles.cards}>
                <ProjectsRenderer projects={projects} />
            </div>
        </div>
    );
}

export default UserProjects;
