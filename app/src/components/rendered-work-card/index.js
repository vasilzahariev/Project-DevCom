import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ALink from '../link';
import EpicProgrammer from '../epic-programmer';
import { useEffect, useRef, useContext, useState } from 'react';
import SimpleTextBtn from '../simple-text-btn';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import WorkEditDialog from '../work-edit-dialog';

const RenderedWorkCard = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();
    const params = useParams();

    const infoBlock = useRef(null);

    const show = String(props.work.info).length !== 0;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (show) infoBlock.current.innerHTML = props.work.info;
    }, [props.work]);

    const deleteWork = async e => {
        if (!window.confirm("Are you sure you want to delete this Work Experience?")) return;

        const promise = await fetch(`${configContext.restApiUrl}/work/delete/${props.work._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/500');
        }
    }

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <h2 className={styles.centered}><ALink to={props.work.companyUrl}>{props.work.company}</ALink></h2>
                <p className={`${styles.centered} ${styles.texts}`}><b><EpicProgrammer>Position:</EpicProgrammer></b> {props.work.position}</p>
                <p className={`${styles.centered} ${styles.texts}`}><b><EpicProgrammer>Years:</EpicProgrammer></b> {props.work.years[0] && props.work.years[1] ? `${props.work.years[0]} - ${props.work.years[1]}` : (props.work.years[0] ? `${props.work.years[0]} - Present` : 'Unspecified')}</p>
                {show ? <hr /> : ''}
                {show ? <h3 className={styles.centered}><EpicProgrammer>More Information:</EpicProgrammer></h3> : ''}
                {show ? <div className={styles.infoBlock} ref={infoBlock}></div> : ''}
                {userContext.user.loggedIn && (userContext.user.isAdmin || params.username === userContext.user.username) ? <div style={{ marginTop: '4%' }} className={styles.centered}>
                    <SimpleTextBtn color='yellow' onClick={() => { setOpen(true) }} >Edit</SimpleTextBtn>
                    {open ? <WorkEditDialog open={open} setOpen={setOpen} work={props.work} /> : ''}
                    <SimpleTextBtn color='red' onClick={deleteWork} >Delete</SimpleTextBtn>
                </div> : ''}
            </div>
        </Grid>
    );
}

export default RenderedWorkCard;
