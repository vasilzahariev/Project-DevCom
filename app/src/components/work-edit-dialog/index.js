import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router';
import Input from '../input';
import SpecialTextArea from '../special-text-area';

const WorkEditDialog = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [company, setCompany] = useState(props.work.company);
    const [companyErr, setComapnyErr] = useState('');
    const [companyUrl, setCompanyUrl] = useState(props.work.companyUrl);
    const [companyUrlErr, setComapnyUrlErr] = useState('');
    const [position, setPosition] = useState(props.work.position);
    const [positionErr, setPositionErr] = useState('');
    const [info, setInfo] = useState(props.work.info);
    const [from, setFrom] = useState(props.work.from);
    const [fromErr, setFromErr] = useState('');
    const [to, setTo] = useState(props.work.to);

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

    const close = () => {
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

    const edit = async e => {
        if (checkForErrs()) return;

        const body = {
            id: props.work._id,
            company,
            companyUrl,
            position,
            info,
            from,
            to
        };

        const promise = await fetch(`${configContext.restApiUrl}/work/edit`, {
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
        <DialogWindow open={props.open} onClearClose={close} title='Edit a Work Experience' action={edit} actionName='Edit'>
            <Input label='Company' type='text' placeholder="Company's Name" value={company} onChange={onCompanyChange} err={companyErr} />
            <Input label="Company's URL" type='text' placeholder="Company's URL" value={companyUrl} onChange={onComapnyUrlChange} err={companyUrlErr} />
            <Input label='Position' type='text' placeholder='Position' value={position} onChange={onPositionChange} err={positionErr} />
            <SpecialTextArea label='More Information' updateBody={onInfoChange} value={info} />
            <Input label='From Year' type='number' placeholder='From Year' value={from} onChange={onFromChange} err={fromErr} />
            <Input label='To Year' type='number' placeholder='To Year (Leave empty if this is your current job)' value={to} onChange={onToChange} />
        </DialogWindow>
    );
}

export default WorkEditDialog;
