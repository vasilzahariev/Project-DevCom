import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import EpicProgrammer from '../../components/epic-programmer';
import CreateJobCard from '../../components/create-job-card';

const CreateJob = (props) => {
    return (
        <Layout>
            <PageDiv>
                <h1>Create a <EpicProgrammer>Job</EpicProgrammer></h1>
                <CreateJobCard />
            </PageDiv>
        </Layout>
    );
}

export default CreateJob;
