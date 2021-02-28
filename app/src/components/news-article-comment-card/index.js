import styles from './index.module.css';
import HeaderLink from '../header-link';
import { useState, useEffect, useContext } from 'react';
import EpicProgrammer from '../epic-programmer';
import NewsReplyInput from '../news-reply-input';
import NewsRepliesRenderer from '../news-replies-renderer';
import UserContext from '../../contexts/UserContext';

const NewsArticleCommentCard = (props) => {
    const userContext = useContext(UserContext);

    const [openReplyInput, setOpenReplyInput] = useState(false);

    const onReplyClick = e => {
        e.preventDefault();

        setOpenReplyInput(true);
    }

    return (
        <div>
            <div className={styles.card}>
                <HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink>
                <div className={styles.comment}>
                    <span>{props.comment.content}</span>
                </div>
                <div className={styles.replyDiv}>
                    { userContext.user.loggedIn ? <span className={styles.reply} onClick={onReplyClick}>Reply</span> : ''}
                </div>
                <div>
                    {openReplyInput ? <NewsReplyInput commentId={props.comment._id} setOpen={setOpenReplyInput} /> : ''}
                </div>
            </div>
            <div>
                <NewsRepliesRenderer commentId={props.comment._id} />
            </div>
        </div>
    );
}

export default NewsArticleCommentCard;
