import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import EpicProgrammer from '../../components/epic-programmer';
import LoginCard from '../../components/login-card';

const Login = () => {
    return (
        <Layout>
            <PageDiv>
                <h1>Glad to have you back, <EpicProgrammer>programmer</EpicProgrammer></h1>
                <LoginCard />
            </PageDiv>
        </Layout>
    );
}

export default Login;
