import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Input from '../input';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const EducationCreateCard = (props) => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [school, setSchool] = useState('');
    const [schoolErr, setSchoolErr] = useState('');
    const [schoolLink, setSchoolLink] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [specializationErr, setSpecializationErr] = useState('');
    const [degree, setDegree] = useState('');
    const [degreeErr, setDegreeErr] = useState('');
    const [from, setFrom] = useState('');
    const [fromErr, setFromErr] = useState('');
    const [to, setTo] = useState('');
    const [toErr, setToErr] = useState('');
    
    const onSchoolChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0) setSchoolErr(`School's name should be at least 1 character long`)
        else setSchoolErr('')

        setSchool(val);
    }

    const onSchoolLinkChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        setSchoolLink(val);
    }

    const onSpecializationChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) setSpecializationErr('Specialization should be at least 1 character long');
        else setSpecializationErr('');

        setSpecialization(val);
    }

    const onDegreeChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) setDegreeErr('Degree should be at least 1 character long');
        else setDegreeErr('');

        setDegree(val);
    }

    const onFromChange = e => {
        const val = e.target.value;

        setFromErr('');
        setFrom(val);
    }

    const onToChange = e => {
        const val = e.target.value;

        setFromErr('');
        setTo(val);
    }

    const onClearClose = () => {
        props.setOpen(false);
        setSchool('');
        setSchoolErr('');
        setSchoolLink('');
        setSpecialization('');
        setSpecializationErr('');
        setDegree('');
        setDegreeErr('');
        setFrom('');
        setTo('');
        setFromErr('');
        setToErr('');
    }

    const checkForErrs = () => {
        let areThereErrs = false;

        if (school.length === 0) {
            setSchoolErr(`School's name should be at least 1 character long`);

            areThereErrs = true;
        }

        if (specialization.length === 0) { setSpecializationErr('Specialization should be at least 1 character long'); areThereErrs = true; }

        if (degree.length === 0) { setDegreeErr('Degree should be at least 1 character long'); areThereErrs = true; }

        if (to && from > to) { setFromErr('From must be less than To'); areThereErrs = true; }

        return areThereErrs;
    }

    const add = async e => {
        e.preventDefault();

        if (checkForErrs()) return;

        const body = {
            userId: userContext.user._id,
            school,
            schoolLink,
            degree,
            specialization,
            from,
            to
        };

        const promise = await fetch(`${configContext.restApiUrl}/edu/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');

        onClearClose();
    }

    return (
        <Dialog open={props.open} scroll='paper' fullWidth={true} maxWidth='md' onClose={onClearClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={styles.title} id='form-dialog-title'>Add Education</DialogTitle>
            <DialogContent className={styles.dialog}>
                <Input label='School Name' type='text' placeholder='School' value={school} onChange={onSchoolChange} err={schoolErr} />
                <Input label='School Link' type='text' placeholder='School Website Link' value={schoolLink} onChange={onSchoolLinkChange} />
                <Input label='Specialization' type='text' placeholder='Specialization' value={specialization} onChange={onSpecializationChange} err={specializationErr} />
                <Input label='Degree' type='text' placeholder='Degree' value={degree} onChange={onDegreeChange} err={degreeErr} />
                <Input label='From Year' type='number' placeholder='From Year' value={from} onChange={onFromChange} err={fromErr} />
                <Input label='To Year' type='number' placeholder="To Year (Leave empty if it's still going on)" value={to} onChange={onToChange} err={toErr} />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn2} type='button' onClick={onClearClose} value='Close' />
                <input className={styles.btn2} type='button' onClick={add} value='Add' />
            </DialogActions>
        </Dialog>
    );
}

export default EducationCreateCard;
