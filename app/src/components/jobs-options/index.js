import styles from './index.module.css';
import SimpleCheckbox from '../simple-checkbox';
import { useState, useEffect } from 'react';

const JobsOptions = (props) => {
    const [fullTime, setFullTime] = useState(true);
    const [partTime, setPartTime] = useState(true);
    const [freelance, setFreelance] = useState(true);

    useEffect(() => {
        const renderJobs = props.jobs.filter(job => {
            if (fullTime && job.type === 'fullTime') return job;
            else if (partTime && job.type === 'partTime') return job;
            else if (freelance && job.type === 'freelance') return job;
        });

        props.setRenderJobs(renderJobs);
    }, [fullTime, partTime, freelance]);

    const onFullTimeClick = e => {
        setFullTime(!fullTime);
    }

    const onPartTimeClick = e => {
        setPartTime(!partTime);
    }

    const onFreelanceClick = e => {
        setFreelance(!freelance);
    }

    return (
        <div className={styles.options}>
            <p>Job Type</p>
            <div>
                <SimpleCheckbox label='Full Time' checked={fullTime} onClick={onFullTimeClick} name='fullTime' />
                <SimpleCheckbox label='Part Time' checked={partTime} onClick={onPartTimeClick} name='partTime' />
                <SimpleCheckbox label='Freelance' checked={freelance} onClick={onFreelanceClick} name='freelance' />
            </div>
        </div>
    );
}

export default JobsOptions;
