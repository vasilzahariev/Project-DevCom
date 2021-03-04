import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Input from '../input';
import { useState, useContext } from 'react';
import SpecialTextArea from '../special-text-area';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const WorkCreateCard = (props) => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [company, setCompany] = useState('');
    const [companyErr, setComapnyErr] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');
    const [companyUrlErr, setComapnyUrlErr] = useState('');
    const [position, setPosition] = useState('');
    const [positionErr, setPositionErr] = useState('');
    const [info, setInfo] = useState('');
    const [from, setFrom] = useState('');
    const [fromErr, setFromErr] = useState('');
    const [to, setTo] = useState('');

    const onCompanyChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) setComapnyErr(`Company's Name should be at least 1 character long`);
        else setComapnyErr('');

        setCompany(val);
    }

    const onComapnyUrlChange = e => {
        const val = String(e.target.value);

        if (val.length === 0 || (val.startsWith('http://') || val.startsWith('https://'))) {
            setComapnyUrlErr('');
        } else {
            setComapnyUrlErr(`Company's Url should either start with 'http://' or 'https://'`)
        }

        setCompanyUrl(val);
    }

    const onPositionChange = e => {
        const val = e.target.value;

        if (val.length === 0) setPositionErr('Position should be at least 1 character long');
        else setPositionErr('');

        setPosition(val);
    }

    const onInfoChange = body => {
        setInfo(body);
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
        setCompany('');
        setComapnyErr('');
        setCompanyUrl('');
        setComapnyUrlErr('');
        setPosition('');
        setPositionErr('');
        setInfo('');
        setFrom('');
        setFromErr('');
        setTo('');
    }

    const checkForErrs = () => {
        let areThereErrs = false;

        if (company.length === 0) {
            setComapnyErr(`Company's Name should be at least 1 character long`);

            areThereErrs = true;
        }

        if (!(companyUrl.length === 0 || (companyUrl.startsWith('http://') || companyUrl.startsWith('https://')))) {
            setComapnyUrlErr(`Company's Url should either start with 'http://' or 'https://'`);

            areThereErrs = true;
        }

        if (position.length === 0) {
            setPositionErr('Position should be at least 1 character long');

            areThereErrs = true;
        }

        if (to && from > to) { setFromErr('From must be less than To'); areThereErrs = true; }

        return areThereErrs;
    }

    const add = async e => {
        if (checkForErrs()) return;

        const body = {
            username: props.username,
            company,
            companyUrl,
            position,
            info,
            from,
            to
        }

        const promise = await fetch(`${configContext.restApiUrl}/work/add`, {
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
            <DialogTitle className={styles.title} id='form-dialog-title'>Add Work Experience</DialogTitle>
            <DialogContent className={styles.dialog}>
                <Input label='Company' type='text' placeholder="Company's Name" value={company} onChange={onCompanyChange} err={companyErr} />
                <Input label="Company's URL" type='text' placeholder="Company's URL" value={companyUrl} onChange={onComapnyUrlChange} err={companyUrlErr} />
                <Input label='Position' type='text' placeholder='Position' value={position} onChange={onPositionChange} err={positionErr} />
                <SpecialTextArea label='More Information' updateBody={onInfoChange} value={info} />
                <Input label='From Year' type='number' placeholder='From Year' value={from} onChange={onFromChange} err={fromErr} />
                <Input label='To Year' type='number' placeholder='To Year (Leave empty if this is your current job)' value={to} onChange={onToChange} />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn2} type='button' onClick={onClearClose} value='Close' />
                <input className={styles.btn2} type='button' onClick={add} value='Add' />
            </DialogActions>
        </Dialog>
    );
}

export default WorkCreateCard;
