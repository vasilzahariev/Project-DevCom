import styles from './index.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import HeaderLink from '../../components/header-link';
import { Grid } from '@material-ui/core';
import AddComment from '../../components/add-comment';
import UserContext from '../../contexts/UserContext';
import NewsArticleCommentsRenderer from '../../components/news-article-comments-renderer';
import NewsTagsRenderer from '../../components/news-tags-renderer';

const NewsArticle = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [article, setArticle] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const path = params.path;

        fetch(`${configContext.restApiUrl}/news/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            if (response.error === '404')
                history.push('/404');

            setArticle(response.article);
            setAuthor(response.author);
            setEnded(true);

            document.getElementById('bodyDiv').innerHTML = response.article.content;
        });

    }, []);

    if (!ended) {
        return (
            <Layout>
                <PageDiv>Loading...</PageDiv>
            </Layout>
        );
    }

    return (
        <Layout>
            <br />
            <h1>{article.title}</h1>
            <div>
                <Grid container alignItems='center'>
                    <Grid item xs={2}>
                        <img className={styles.img} src={author.profilePictureUrl} />
                        <span className={styles.byText}> by <HeaderLink to={`/${author.username}`}>{author.fullName}</HeaderLink></span>
                    </Grid>
                    <Grid item xs={3}>
                        <span className={styles.published}>Published: {`${article.publishedDate.split('T')[0]} ${article.publishedDate.split('.')[0].split('T')[1]}`}</span>
                    </Grid>
                    <Grid item xs={7}>
                        {article.publishedDate !== article.lastEditedDate ? <span className={styles.published}>Last Edited: {`${article.lastEditedDate.split('T')[0]} ${article.lastEditedDate.split('.')[0].split('T')[1]}`}</span> : ''}
                    </Grid>
                </Grid>
            </div>
            <br />
            <hr />
            <br />
            <div id='bodyDiv' className={styles.bodyDiv}></div>
            <br />
            <div>
                <NewsTagsRenderer tags={article.tags} />
            </div>
            <div className={styles.comments}>
                <h2>Comments</h2>
                <div className={styles.bodyDiv}>
                    <div>
                        { userContext.user.loggedIn ? <AddComment articleId={article._id} /> : '' }
                    </div>
                    <div>
                        <NewsArticleCommentsRenderer articleId={article._id} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NewsArticle;
