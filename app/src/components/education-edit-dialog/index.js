import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useState, useContext, useEffect } from 'react';
import Input from '../input';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const EducationEditDialog = (props) => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [school, setSchool] = useState(props.education.school);
    const [schoolErr, setSchoolErr] = useState('');
    const [schoolLink, setSchoolLink] = useState(props.education.schoolLink);
    const [specialization, setSpecialization] = useState(props.education.specialization);
    const [specializationErr, setSpecializationErr] = useState('');
    const [degree, setDegree] = useState(props.education.degree);
    const [degreeErr, setDegreeErr] = useState('');
    const [from, setFrom] = useState(props.education.from);
    const [fromErr, setFromErr] = useState('');
    const [to, setTo] = useState(props.education.to);
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

    const close = () => {
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

    const edit = async e => {
        e.preventDefault();

        if (checkForErrs()) return;

        const body = {
            id: props.education._id,
            school,
            schoolLink,
            specialization,
            degree,
            from,
            to
        };

        const promise = await fetch(`${configContext.restApiUrl}/edu/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/500');

            return;
        }

        close();
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Edit Education' action={edit} actionName='Edit'>
            <Input label='School Name' type='text' placeholder='School' value={school} onChange={onSchoolChange} err={schoolErr} />
            <Input label='School Link' type='text' placeholder='School Website Link' value={schoolLink} onChange={onSchoolLinkChange} />
            <Input label='Specialization' type='text' placeholder='Specialization' value={specialization} onChange={onSpecializationChange} err={specializationErr} />
            <Input label='Degree' type='text' placeholder='Degree' value={degree} onChange={onDegreeChange} err={degreeErr} />
            <Input label='From Year' type='number' placeholder='From Year' value={from} onChange={onFromChange} err={fromErr} />
            <Input label='To Year' type='number' placeholder="To Year (Leave empty if it's still going on)" value={to} onChange={onToChange} err={toErr} />
        </DialogWindow>
    );
}

export default EducationEditDialog;
