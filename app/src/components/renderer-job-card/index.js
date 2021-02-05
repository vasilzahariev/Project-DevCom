import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import HeaderLink from '../header-link';
import JobContext from '../../contexts/JobContext';

const RendererJobCard = (props) => {
    const jobContext = useContext(JobContext);
    const configContext = useContext(ConfigContext);

    const jobType = props.job.type === 'freelance' ? 'Freelance' : (props.job.type === 'fullTime' ? 'Full Time' : (props.job.type === 'partTime' ? 'Part Time' : ''));
    const publishedDate = new Date(Date.parse(`${props.job.publishDate}`));

    const [username, setUsername] = useState('');
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/u/${props.job.authorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUsername(response.username);
            setEnded(true);
        });
    }, [username]);

    const onClick = e => {
        e.preventDefault();

        props.setJob(props.job);
        props.setUsername(username);
    }

    if (!ended) {
        return (
            <div></div>
        );
    }

    return (
        <Grid item xs={12}>
            <div className={styles.card} onClick={onClick}>
                <Grid container spacing={1}>
                    <Grid item>
                        <p className={styles.type}>{jobType}</p>
                    </Grid>
                    <Grid item>
                        <p>{props.job.name}</p>
                    </Grid>
                </Grid>
                <Grid container justify="space-between">
                    <Grid item>
                        <p>{`${('0' + publishedDate.getDate()).slice(-2)}.${('0' + (publishedDate.getMonth() + 1)).slice(-2)}.${publishedDate.getFullYear()}`}</p>
                    </Grid>
                    <Grid item>
                        <p>{props.job.location}</p>
                    </Grid>
                    <Grid item>
                        <p><HeaderLink to={`/u/${username}`}>{username}</HeaderLink></p>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

export default RendererJobCard;
