import styles from './index.module.css';
import { useState, useContext, useEffect } from 'react';
import TextArea from '../text-area';
import SubmitBtn from '../submit-btn';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';

const AddComment = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const [comment, setComment] = useState('');

    const onCommentChange = e => {
        e.preventDefault();

        const val = e.target.value;

        setComment(val);
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (comment.length === 0) return;

        const body = {
            articleId: props.articleId,
            comment,
            commentatorId: userContext.user._id
        }

        const promise = await fetch(`${configContext.restApiUrl}/news/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.status) {
            setComment('');
        } else {
            return;
        }
    }

    return (
        <div className={styles.addCommentDiv}>
            <form method='post' onSubmit={onSubmit}>
                <TextArea placeholder='Comment' onChange={onCommentChange} value={comment} />
                <div className={styles.btn}><SubmitBtn>Post</SubmitBtn></div>
            </form>
        </div>
    );
}

export default AddComment;
