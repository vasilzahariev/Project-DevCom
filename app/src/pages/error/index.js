import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';

const Error = (props) => {
    const message = props.err === '500' ? 'Error: 500 (Internal Server Error)' : 'Error: 404 (Page Not Found)'

    return (
        <Layout>
            <PageDiv>
                <h1 style={{ color: 'red' }}>{message}</h1>
            </PageDiv>
        </Layout>
    );
}

export default Error;
