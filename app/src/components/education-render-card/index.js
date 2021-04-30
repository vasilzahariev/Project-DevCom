import { Grid } from '@material-ui/core';
import styles from './index.module.css';
import ALink from '../link';
import SubmitBtn from '../submit-btn';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { useParams, useHistory } from 'react-router-dom';
import SimpleTextBtn from '../simple-text-btn';
import EducationEditDialog from '../education-edit-dialog';
import ConfigContext from '../../contexts/ConfigContext';

const EducationRenderCard = (props) => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const params = useParams();
    const history = useHistory();

    const edu = props.edu;

    const [open, setOpen] = useState(false);

    useEffect(() => {

    }, [edu]);

    const deleteEdu = async e => {
        e.preventDefault();

        const promise = await fetch(`${configContext.restApiUrl}/edu/deleteEducation/${edu._id}`, {
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
                <Grid container direction='row'>
                    <Grid item xs={6}>
                        <Grid container direction='column' alignItems='flex-start' spacing={3}>
                            <Grid item><ALink to={edu.schoolLink}>{edu.school}</ALink></Grid>
                            <Grid item>{edu.specialization}</Grid>
                            {userContext.user.loggedIn && (userContext.user.isAdmin || userContext.user.username === params.username) ? <Grid item><SimpleTextBtn color='yellow' onClick={() => { setOpen(true) }}>Edit</SimpleTextBtn></Grid> : ''}
                            {open ? <EducationEditDialog open={open} setOpen={setOpen} education={edu} /> : ''}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction='column' alignItems='flex-end' spacing={3}>
                            <Grid item>{edu.degree}</Grid>
                            <Grid item>{edu.years[0] && edu.years[1] ? `${edu.years[0]} - ${edu.years[1]}` : (edu.years[0] ? `${edu.years[0]} - Present` : '')}</Grid>
                            {userContext.user.loggedIn && (userContext.user.isAdmin || userContext.user.username === params.username) ? <Grid item><SimpleTextBtn color='red' onClick={deleteEdu}>Delete</SimpleTextBtn></Grid> : ''}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

export default EducationRenderCard;
