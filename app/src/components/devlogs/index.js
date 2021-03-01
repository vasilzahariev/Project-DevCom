import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo, useContext } from 'react';
import RenderedDevlogCard from '../rendered-devlog-card';
import SubmitBtn from '../submit-btn';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const DevLogs = props => {
    const userContext = useContext(UserContext);

    const history = useHistory();

    const checkIfUserIsMember = () => {
        if (!userContext.user || !userContext.user.loggedIn) return false;

        for (const member of props.members) {
            if (member._id === props.project.ownerId) return true;
        }

        return false;
    }

    const renderer = useMemo(() => {
        return props.devlogs.map((devlog, index) => {
            return (
                <RenderedDevlogCard key={devlog._id} index={index} devlog={devlog} checkIfUserIsMember={checkIfUserIsMember} selectedDevlogId={props.selectedDevlogId} />
            );
        });
    }, [props.devlogs]);

    const onAddClick = e => {
        history.push(`/devlogs/add/${props.project.projectUrl}`)
    }

    return (
        <div>
            <div>
                <Grid container justify="center">
                    <Grid item xs={2}><div style={{ fontSize: '1.5rem' }}>DevLogs</div></Grid>
                    <Grid item xs={5}>{checkIfUserIsMember() ? <SubmitBtn color='blue' onClick={onAddClick}>Add Devlog</SubmitBtn> : ''}</Grid>
                    <Grid item xs={5}></Grid>
                </Grid>
            </div>
            <div className={styles.devlogs}>
                <Grid container spacing={4}>
                    {renderer}
                </Grid>
            </div>
        </div>
    );
}

export default DevLogs;
