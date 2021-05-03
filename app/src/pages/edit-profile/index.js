import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import SettingsCard from '../../components/settings-card';
import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';

const EditProfile = () => {
    const userContext = useContext(UserContext);
    
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!(userContext.user.loggedIn && userContext.user.username === params.username)) {
            history.push('/404');
        }
    });

    return (
        <Layout>
            <PageDiv>
                <h1>Edit Profile</h1>

                <SettingsCard username={params.username} />
            </PageDiv>
        </Layout>
    );
}

export default EditProfile;
