import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import SimpleTextBtn from '../simple-text-btn';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import HeaderLink from '../header-link';

const JobRow = props => {
    const configContext = useContext(ConfigContext);
    const date = new Date(Date.parse(`${props.job.publishDate}`));

    const history = useHistory();

    const onViewClick = e => {
        history.push(`/jobs/${props.job._id}`);
    }

    const onEditClick = e => {
        history.push(`/jobs/edit/${props.job._id}`);
    }

    const onOpenClick = async e => {
        const promise = await fetch(`${configContext.restApiUrl}/jobs/open/${props.job._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    const onCloseClick = async e => {
        const promise = await fetch(`${configContext.restApiUrl}/jobs/close/${props.job._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    const onDeleteClick = async e => {
        if (!window.confirm(`Are you sure you want to delete a job with name: "${props.job.name}"`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/jobs/delete/${props.job._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container>
                <Grid className={styles.value} item xs={1}>{props.index}</Grid>
                <Grid className={styles.value} item xs={2}>{props.job.name}</Grid>
                {props.showUser ? <Grid className={styles.value} item xs={1}><HeaderLink to={`/u/${props.job.user.username}`}>{props.job.user.username}</HeaderLink></Grid> : ''}
                <Grid className={styles.value} item xs={props.showUser ? 1 : 2}>{props.job.type === 'fullTime' ? 'Full Time' : (props.job.type === 'partTime' ? 'Part Time' : (props.job.type === 'freelance' ? 'Freelance' : ''))}</Grid>
                <Grid className={styles.value} item xs={2}>{date.toLocaleDateString()}</Grid>
                <Grid className={styles.value} item xs={1}>{props.job.isClosed ? 'Closed' : 'Open'}</Grid>
                <Grid className={styles.value} item xs={4}>
                    <div className={styles.btn}>
                        <SubmitBtn color='blue' onClick={onViewClick}>View</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='yellow' onClick={onEditClick}>Edit</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        {props.job.isClosed ? <SubmitBtn color='green' onClick={onOpenClick}>Open</SubmitBtn> : <SubmitBtn color='red' onClick={onCloseClick}>Close</SubmitBtn>}
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='red' onClick={onDeleteClick}>Delete</SubmitBtn>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default JobRow;
