import styles from './index.module.css';
import PageDiv from '../page-div';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '../input';
import { useEffect } from 'react';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import EducationsRenderer from '../educations-renderer';
import EducationCreateCard from '../education-create-card';

const Educations = (props) => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [educations, setEducations] = useState(null);
    const [ended, setEnded] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/edu/${props.username}/getEducations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setEducations(response);
            setEnded(true);
        });

    }, [educations]);

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
                {(userContext.user && userContext.user.loggedIn && userContext.user.username === props.username) ? <input className={styles.btn} type='button' onClick={() => { setOpen(true) }} value='Add Education' /> : ''}

                <EducationCreateCard open={open} setOpen={setOpen} />

                <EducationsRenderer educations={educations} />
            </PageDiv>
        </div>
    );
}

export default Educations;
