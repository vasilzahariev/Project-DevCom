import { useEffect, useState, useContext } from 'react';
import styles from './index.module.css';
import ConfigContext from '../../contexts/ConfigContext';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import HeaderLink from '../../components/header-link';
import UserContext from '../../contexts/UserContext';
import Header from '../../components/header';

const News = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const [news, setNews] = useState([]);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        fetch(configContext.restApiUrl + '/news/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            setNews(response);
            setEnded(true);
        })
    }, []);

    if (!ended) {
        return (
            <Layout>
                <PageDiv>
                    Loading...
                </PageDiv>
            </Layout>
        )
    }

    return (
        <Layout>
            <PageDiv>
                {userContext.user.loggedIn && (userContext.user.isJournalist || userContext.user.isAdmin) ? <HeaderLink to='/news/create'>Write an Article</HeaderLink> : <span></span>}
                {news.length === 0 ? <p>Seems kinda empty</p> : <p>Render news</p>}
                <p>TODO: Render articles</p>
            </PageDiv>
        </Layout>
    );
}

export default News;
