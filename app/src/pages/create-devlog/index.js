import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import { useState, useEffect, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useParams, useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { Backdrop, CircularProgress } from '@material-ui/core';
import ALink from '../../components/link';
import CreateDevlogForm from '../../components/create-devlog-form';

const CreateDevlog = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const params = useParams();
    const history = useHistory();

    const [project, setProject] = useState(null);
    const [ended, setEnded] = useState(false);

    const checkIfMember = members => {
        for (const member of members) {
            if (member._id === userContext.user._id) return true;
        }

        return false;
    }

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/${params.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) {
                history.push('/404');
            } else if (!checkIfMember(response.members)) {
                history.push(`/projects/${params.url}`);
            } else {
                setProject(response.project);
            }

            setEnded(true);
        });
    }, [project]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <Layout>
            <PageDiv>
                <h1>Create a Devlog for <ALink to={`/projects/${params.url}`}>{project.name}</ALink></h1>
                <CreateDevlogForm project={project} />
            </PageDiv>
        </Layout>
    );
}

export default CreateDevlog;
