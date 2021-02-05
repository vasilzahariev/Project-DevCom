import styles from './index.module.css';
import { useEffect, useMemo, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import NewsArticleCommentCard from '../news-article-comment-card';
import { CircularProgress } from '@material-ui/core';

const NewsArticleCommentsRenderer = (props) => {
    const configContext = useContext(ConfigContext);

    const [comments, setComments] = useState(null);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/news/${props.articleId}/getComments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            setComments(response);
            setEnded(true);
        });
    }, [comments]);

    const renderer = useMemo(() => {
        if (!ended) return;

        return comments.map((obj, index) => {
            return (
                <NewsArticleCommentCard key={obj.comment._id} index={index} comment={obj.comment} user={obj.user} />
            )
        });
    }, [comments]);

    if (!ended) {
        return (
            <div>
                <CircularProgress color="inherit" />
            </div>
        );
    }

    return (
        <div>
            <h3>All ({comments.length})</h3>
            <div className={styles.renderedComments}>
                {renderer}
            </div>
        </div>
    );
}

export default NewsArticleCommentsRenderer;
