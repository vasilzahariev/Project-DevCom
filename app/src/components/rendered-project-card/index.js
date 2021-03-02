import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ALink from '../link';
import EpicProgrammer from '../epic-programmer';
import { useEffect, useRef } from 'react';

const RenderedProjectCard = props => {
    const descBlock = useRef(null);

    const show = String(props.project.description).length !== 0;

    useEffect(() => {
        descBlock.current.innerHTML = props.project.description;
    });

    return (
        <Grid item xs={12}>
            <div style={{ width: props.width ? props.width : '50%' }} className={styles.card}>
                <h2 className={styles.centered}><ALink to={`/projects/${props.project.projectUrl}`}>{props.project.name}</ALink></h2>
                {props.project.gitHubUrl ? <p className={`${styles.centered} ${styles.texts}`}><b><EpicProgrammer>GitHub:</EpicProgrammer></b> <ALink to={props.project.gitHubUrl}>{props.project.gitHubUrl}</ALink></p> : ''}
                {show ? <br /> : ''}
                {show ? <div className={styles.infoBlock} ref={descBlock}></div> : ''}
            </div>
        </Grid>
    );
}

export default RenderedProjectCard;
