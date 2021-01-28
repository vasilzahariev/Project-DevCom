import styles from './index.module.css';
import { useMemo, useState, useEffect, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import NewsReplyCard from '../news-reply-card';

const NewsRepliesRenderer = (props) => {
    const configContext = useContext(ConfigContext);

    const [ended, setEnded] = useState(false);
    const [replies, setReplies] = useState(null);

    const renderer = useMemo(() => {
        if (!ended) return;

        return replies.map((reply, index) => {
            return (
                <NewsReplyCard key={reply._id} index={index} reply={reply} />
            );
        });
    }, [replies]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/news/comment/${props.commentId}/getReplies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            console.log(response);

            setReplies(response);
            setEnded(true);
        });
    }, [replies]);

    if (!ended) {
        return (
            <div></div>
        )
    }

    return (
        <div className={styles.replies}>
            {renderer}
        </div>
    );
}

export default NewsRepliesRenderer;
