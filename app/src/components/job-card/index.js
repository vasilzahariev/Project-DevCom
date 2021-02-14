import styles from './index.module.css';
import { useContext, useEffect, useState } from 'react';
import JobContext from '../../contexts/JobContext';
import PageDiv from '../page-div';
import { Grid } from '@material-ui/core';
import HeaderLink from '../header-link';
import EpicProgrammer from '../epic-programmer';
import SubmitBtn from '../submit-btn';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const JobCard = (props) => {
    const jobContext = useContext(JobContext);
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [publishDate, setPublishDate] = useState(new Date());

    useEffect(() => {
        if (jobContext.job) {
            const desc = document.getElementById('description');

            desc.innerHTML = jobContext.job.description;

            const newDate = new Date(Date.parse(`${jobContext.job.publishDate}`));

            setPublishDate(newDate);
        }
    }, [jobContext.job]);

    if (!jobContext.job) {
        return (
            <PageDiv>No selected job</PageDiv>
        );
    }

    const getSalaryAsString = val => {
        val += '';

        const x = val.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    }

    const onCloseClick = async e => {
        e.preventDefault();

        const promise = await fetch(`${configContext.restApiUrl}/jobs/close/${jobContext.job._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
        else window.location.reload(false);
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{jobContext.job.name}</h3>
            <p className={styles.by}>by <HeaderLink to={`/u/${jobContext.username}`}>{jobContext.username}</HeaderLink></p>
            <p><EpicProgrammer><b>Published Date: </b></EpicProgrammer>{`${('0' + publishDate.getDate()).slice(-2)}.${('0' + (publishDate.getMonth() + 1)).slice(-2)}.${publishDate.getFullYear()}`}</p>
            <p><EpicProgrammer><b>Location: </b></EpicProgrammer>{jobContext.job.location}</p>
            <p><EpicProgrammer><b>Job Type: </b></EpicProgrammer>{jobContext.job.type === 'fullTime' ? 'Full Time' : (jobContext.job.type === 'partTime' ? 'Part Time' : (jobContext.job.type === 'freelance' ? 'Freelance' : ''))}</p>
            <p><EpicProgrammer><b>Salary: </b></EpicProgrammer>{jobContext.job.isNegotiableSalary ? 'Negotiable Salary' : (jobContext.job.salaryRanges[0] === jobContext.job.salaryRanges[1] ? `$${getSalaryAsString(jobContext.job.salaryRanges[0])} $` : `$${getSalaryAsString(jobContext.job.salaryRanges[0])} - $${getSalaryAsString(jobContext.job.salaryRanges[1])}`)}</p>
            { /*<p><b className={styles.kme}>Published Date: </b>{`${('0' + publishDate.getDate()).slice(-2)}.${('0' + (publishDate.getMonth() + 1)).slice(-2)}.${publishDate.getFullYear()}`}</p>
            <p><b className={styles.kme}>Location: </b>{jobContext.job.location}</p>
            <p><b className={styles.kme}>Job Type: </b>{jobContext.job.type === 'fullTime' ? 'Full Time' : (jobContext.job.type === 'partTime' ? 'Part Time' : (jobContext.job.type === 'freelance' ? 'Freelance' : ''))}</p>
            <p><b className={styles.kme}>Salary: </b>{jobContext.job.isNegotiableSalary ? 'Negotiable Salary' : (jobContext.job.salaryRanges[0] === jobContext.job.salaryRanges[1] ? `$${getSalaryAsString(jobContext.job.salaryRanges[0])} $` : `$${getSalaryAsString(jobContext.job.salaryRanges[0])} - $${getSalaryAsString(jobContext.job.salaryRanges[1])}`)}</p> Bright*/}
            <hr />
            <h3 className={styles.name}><EpicProgrammer><b>Job Description:</b></EpicProgrammer></h3>
            {/* <h3 className={styles.name}><b className={styles.kme}>Description: </b></h3> Bright */}
            <div id='description'>
            </div>
            <div className={styles.btns}>
                {userContext.user.loggedIn && (userContext.user.username === jobContext.username) ? <span className={styles.btn}><SubmitBtn color='red' onClick={onCloseClick}>Close</SubmitBtn></span> : ''}
                <SubmitBtn>Apply</SubmitBtn>
            </div>
        </div>
    );
}

export default JobCard;
