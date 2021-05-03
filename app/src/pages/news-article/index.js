import styles from './index.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import HeaderLink from '../../components/header-link';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import AddComment from '../../components/add-comment';
import UserContext from '../../contexts/UserContext';
import NewsArticleCommentsRenderer from '../../components/news-article-comments-renderer';
import NewsTagsRenderer from '../../components/news-tags-renderer';
import UserAvatar from '../../components/user-avatar';
import SubmitBtn from '../../components/submit-btn';
import EditArticleDialog from '../../components/edit-article-dialog';
import { useMediaQuery } from 'react-responsive'

const NewsArticle = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [article, setArticle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    useEffect(() => {
        const path = params.path;

        fetch(`${configContext.restApiUrl}/news/n/${path}`, {
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

            if (document.getElementById('bodyDiv')) document.getElementById('bodyDiv').innerHTML = response.article.content;
        });

    }, [article]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const remove = async e => {
        if (!window.confirm(`Are you sure you want to delete article with title: "${article.title}"?`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/news/delete/${article._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/500');

        history.push('/news/');
    }

    return (
        <Layout>
            <br />
            <h1>{article.title}</h1>
            <div>
                <Grid container alignItems='center' spacing={isMobile ? 1 : 0}>
                    <Grid item xs={isMobile ? 4 : 2}>
                        <Grid container alignItems='center'>
                            <Grid item>
                                <UserAvatar user={author} size={ isMobile ? 3 : 6} />
                            </Grid>
                            <Grid item>
                                <span className={styles.byText}><HeaderLink to={`/u/${author.username}`}>{author.fullName}</HeaderLink></span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={isMobile ? 4 : 3}>
                        <span className={styles.published}>Published: {`${article.publishedDate.split('T')[0]} ${article.publishedDate.split('.')[0].split('T')[1]}`}</span>
                    </Grid>
                    <Grid item xs={isMobile ? 4 : 7}>
                        {article.publishedDate !== article.lastEditedDate ? <span className={styles.published}>Last Edited: {`${article.lastEditedDate.split('T')[0]} ${article.lastEditedDate.split('.')[0].split('T')[1]}`}</span> : ''}
                    </Grid>
                </Grid>
                {userContext.user.loggedIn && (userContext.user._id === author._id || userContext.user.isAdmin) ?
                    <div className={styles.btns}>
                        <div className={styles.btn}><SubmitBtn color='yellow' onClick={() => { setEditOpen(true) }}>Edit</SubmitBtn></div>
                        {editOpen ? <EditArticleDialog open={editOpen} setOpen={setEditOpen} article={article} /> : ''}
                        <div className={styles.btn}><SubmitBtn color='red' onClick={remove}>Delete</SubmitBtn></div>
                    </div> : ''}
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
                        {userContext.user.loggedIn ? <AddComment articleId={article._id} /> : ''}
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
