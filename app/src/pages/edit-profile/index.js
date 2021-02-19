import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import SettingsCard from '../../components/settings-card';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
    const params = useParams();

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
