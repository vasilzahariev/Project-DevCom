import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import CardForm from '../card-form';
import Input from '../input';
import SelectInput from '../select-input';
import SpecialTextArea from '../special-text-area';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import SimpleCheckbox from '../simple-checkbox';
import RangedSlider from '../ranged-slider';
import SubmitBtn from '../submit-btn';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';

const CreateJobCard = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const optionValues = ['fullTime', 'partTime', 'freelance'];

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [type, setType] = useState(optionValues[0]);
    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [location, setLocation] = useState('');
    const [negotiableSalary, setNegotiableSalary] = useState(false);
    const [salary, setSalary] = useState([0, 100000]);

    const onNameChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setNameErr(`Job's name should be at least 1 character long`);
        else
            setNameErr('');

        setName(val);
    }

    const updateBody = body => {
        if (String(body).length === 0)
            setDescriptionErr('Description must be at least 1 character long');
        else
            setDescriptionErr('');

        setDescription(body);
    }

    const onLocationChange = e => {
        e.preventDefault();

        const val = e.target.value;

        setLocation(val);
    }

    const onNegotiableSalaryChange = e => {
        e.preventDefault();

        setNegotiableSalary(!negotiableSalary);
    }

    const onSalaryChange = (e, newValue) => {
        e.preventDefault();

        setSalary(newValue)
    }

    const onFirstValChange = (e) => {
        e.preventDefault();

        const val = e.target.value;

        setSalary([val, salary[1]]);
    }

    const onSecondValChange = e => {
        e.preventDefault();

        const val = e.target.value;

        setSalary([salary[0], val]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        /// if location is empty set value of 'Remote'

        const body = {
            authorId: userContext.user._id,
            name,
            description,
            location: !location ? 'Remote' : location,
            type,
            negotiableSalary,
            salary
        };

        const promise = await fetch(`${configContext.restApiUrl}/jobs/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        history.push(`/jobs/${response.jobId}`);
    }

    return (
        <CardForm onSubmit={onSubmit} big={true}>
            <Input label='Name' value={name} err={nameErr} onChange={onNameChange} placeholder={`Job's Name`} />
            <SpecialTextArea label='Description' updateBody={updateBody} value={description} err={descriptionErr} />
            <Input label='Location' value={location} onChange={onLocationChange} placeholder={`Default: Remote`} />
            <div className={styles.type}>
                <label>
                    <p>Type</p>

                    <SelectInput label='Job Type' name='type' value={type} setValue={setType} width={150}>
                        <option value={optionValues[0]}>Full Time</option>
                        <option value={optionValues[1]}>Part Time</option>
                        <option value={optionValues[2]}>Freelance</option>
                    </SelectInput>
                </label>
            </div>
            <div className={styles.salary}>
                <SimpleCheckbox label='Negotiable Salary' name='negotiablesalary' checked={negotiableSalary} onClick={onNegotiableSalaryChange} />
                {negotiableSalary ? '' : <RangedSlider value={salary} onChange={onSalaryChange} onFirstValChange={onFirstValChange} onSecondValChange={onSecondValChange} min={0} max={100000} step={100} />}
            </div>
            <div className={styles.btn}>
                <SubmitBtn>Publish</SubmitBtn>
            </div>
        </CardForm>
    );
}

export default CreateJobCard;
