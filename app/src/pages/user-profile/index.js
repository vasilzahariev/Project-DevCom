import styles from './index.module.css';
import Layout from '../../components/layout';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import { Backdrop, CircularProgress } from '@material-ui/core';
import UserPart from '../../components/user-part';
import Educations from '../../components/educations';
import WorkExperience from '../../components/work-experience';
import UserFeed from '../../components/user-feed';
import UserProjects from '../../components/user-projects';
import Dashboard from '../../components/dashboard';

const UserProfile = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [section, setSection] = useState('feed');

    useEffect(() => {
        const username = params.username;

        fetch(`${configContext.restApiUrl}/auth/isUser/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response) history.push('/404');

            setEnded(true);
        });

    }, [params.username]);

    const onClick = (e, val) => {
        setSection(val);
    }

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Layout>
            <UserPart username={params.username} />
            <div className={styles.btns}>
                <input className={`${styles.btn} ${section === 'feed' ? styles.currentTab : ''}`} type='submit' onClick={(e) => onClick(e, 'feed')} value='Feed' />
                <input className={`${styles.btn} ${section === 'education' ? styles.currentTab : ''}`} type='submit' onClick={(e) => onClick(e, 'education')} value='Education' />
                <input className={`${styles.btn} ${section === 'work' ? styles.currentTab : ''}`} type='submit' onClick={(e) => onClick(e, 'work')} value='Work' />
                <input className={`${styles.btn} ${section === 'projects' ? styles.currentTab : ''}`} type='submit' onClick={(e) => onClick(e, 'projects')} value='Projects' />
                {(userContext.user.loggedIn && (userContext.user.username === params.username || userContext.user.isAdmin)) ? <input className={`${styles.btn} ${section === 'dashboard' ? styles.currentTab : ''}`} type='submit' onClick={(e) => onClick(e, 'dashboard')} value='Dashboard' /> : ''}
            </div>

            {section === 'feed' ? <UserFeed username={params.username} /> : ''}
            {section === 'education' ? <Educations username={params.username} /> : ''}
            {section === 'work' ? <WorkExperience username={params.username} /> : ''}
            {section === 'projects' ? <UserProjects username={params.username} /> : ''}
            {section === 'dashboard' ? <Dashboard username={params.username} /> : ''}
        </Layout>
    );
}

export default UserProfile;
