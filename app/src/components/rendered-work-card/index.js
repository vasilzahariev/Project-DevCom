import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ALink from '../link';
import EpicProgrammer from '../epic-programmer';
import { useEffect, useRef } from 'react';

const RenderedWorkCard = (props) => {
    const infoBlock = useRef(null);

    const show = String(props.work.info).length !== 0;

    useEffect(() => {
        if (show) infoBlock.current.innerHTML = props.work.info;
    }, [props.work]);

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <h2 className={styles.centered}><ALink to={props.work.companyUrl}>{props.work.company}</ALink></h2>
                <p className={`${styles.centered} ${styles.texts}`}><b><EpicProgrammer>Position:</EpicProgrammer></b> {props.work.position}</p>
                <p className={`${styles.centered} ${styles.texts}`}><b><EpicProgrammer>Years:</EpicProgrammer></b> {props.work.years[0] && props.work.years[1] ? `${props.work.years[0]} - ${props.work.years[1]}` : (props.work.years[0] ? `${props.work.years[0]} - Present` : 'Unspecified')}</p>
                {show ? <hr /> : ''}
                {show ? <h3 className={styles.centered}><EpicProgrammer>More Information:</EpicProgrammer></h3> : ''}
                {show ? <div className={styles.infoBlock} ref={infoBlock}></div> : ''}
            </div>
        </Grid>
    );
}

export default RenderedWorkCard;
