import { useEffect, useState, useContext } from 'react';
import styles from './index.module.css';
import ConfigContext from '../../contexts/ConfigContext';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import HeaderLink from '../../components/header-link';
import UserContext from '../../contexts/UserContext';
import Header from '../../components/header';
import NewsRenderer from '../../components/news-renderer';
import { Backdrop, CircularProgress } from '@material-ui/core';

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
            const newsArr = response.filter(elem => { if (!elem.isDraft) { return elem; } });

            setNews(newsArr);
            setEnded(true);
        })
    }, []);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <Layout>
            <PageDiv>
                <h1>Latest News</h1>
                {userContext.user.loggedIn && (userContext.user.isJournalist || userContext.user.isAdmin) ? <HeaderLink to='/news/create'>Write an Article</HeaderLink> : <span></span>}
            </PageDiv>
            {news.length === 0 ? <p>Seems kinda empty</p> : <NewsRenderer news={news} />}
        </Layout>
    );
}

export default News;
