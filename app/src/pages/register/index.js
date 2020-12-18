import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import RegisterCard from '../../components/register-card';
import EpicProgrammer from '../../components/epic-programmer';

const Register = () => {
    return (
        <Layout>
            <PageDiv>
                <h1>Join us now and become an <EpicProgrammer>epic programmer</EpicProgrammer></h1>

                <RegisterCard />
            </PageDiv>
        </Layout>
    );
}

export default Register;
