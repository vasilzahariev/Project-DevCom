import styles from './index.module.css';
import { Grid, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import ArticleRow from '../article-row';

const ArticlesTable = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/news/getUserArticles/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setArticles(response.articles);
            setEnded(true);
        });
    }, [articles]);

    const renderer = useMemo(() => {
        return articles.map((article, index) => {
            return (
                <ArticleRow key={article._id} index={index} article={article} showUser={props.showUser} />
            );
        });
    }, [articles]);

    if (!ended) {
        return (
            <CircularProgress color='inherit' />
        );
    }

    return (
        <div>
            <Grid className={styles.table} container spacing={1}>
                <Grid className={styles.head} item xs={12}>
                    <Grid container>
                        <Grid className={styles.value} item xs={1}><b>#</b></Grid>
                        <Grid className={styles.value} item xs={props.showUser ? 2 : 3}><b>Title</b></Grid>
                        <Grid className={styles.value} item xs={props.showUser ? 1 : 2}><b>Path</b></Grid>
                        {props.showUser ? <Grid className={styles.value} item xs={2}><b>Username</b></Grid> : ''}
                        <Grid className={styles.value} item xs={1}><b>Status</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Published Date</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Last Edited Date</b></Grid>
                        <Grid className={styles.value} item xs={3}><b>Actions</b></Grid>
                    </Grid>
                </Grid>
                {renderer}
            </Grid>
        </div>
    );
}

export default ArticlesTable;
