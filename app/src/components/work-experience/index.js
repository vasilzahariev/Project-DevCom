import styles from './index.module.css';
import { useState, useEffect, useContext } from 'react';
import PageDiv from '../page-div';
import { CircularProgress } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import WorkCreateCard from '../work-create-card';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import WorkRenderer from '../work-renderer';

const WorkExperience = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [open, setOpen] = useState(false);
    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/work/u/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response) history.push('/500');

            setWorkExperiences(response);
            setEnded(true);
        });
    }, [workExperiences]);

    if (!ended) {
        return (
            <PageDiv>
                <CircularProgress color="inherit" />
            </PageDiv>
        );
    }

    return (
        <div>
            <PageDiv>
                {(userContext.user && userContext.user.loggedIn && userContext.user.username === props.username) ? <input className={styles.btn} type='button' onClick={() => { setOpen(true) }} value='Add Work Experience' /> : ''}

                {(userContext.user && userContext.user.loggedIn && userContext.user.username === props.username) ? <WorkCreateCard open={open} setOpen={setOpen} username={props.username} /> : ''}
            </PageDiv>

            <div className={styles.cards}>
                <WorkRenderer workExperiences={workExperiences} />
            </div>
        </div>
    );
}

export default WorkExperience;
