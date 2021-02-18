import styles from './index.module.css';
import TextArea from '../text-area';
import { useState, useContext } from 'react';
import SubmitBtn from '../submit-btn';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';

const NewsReplyInput = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const [reply, setReply] = useState('');

    const onReplyChange = e => {
        e.preventDefault();

        const val = e.target.value;

        setReply(val);
    }

    const closeComponent = () => {
        props.setOpen(false);
    }

    const onSubmit = async e => {
        e.preventDefault();

        const btnVal = e.nativeEvent.submitter.value;

        if (btnVal === 'Cancel') {
            closeComponent();
        } else {
            if (reply.length === 0) return;

            const body = {
                commentId: props.commentId,
                username: userContext.user.username,
                reply
            }

            const promise = await fetch(`${configContext.restApiUrl}/news/addReply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const response = await promise.json();

            closeComponent();
        }
    }

    return (
        <form method='POST' onSubmit={onSubmit}>
            <TextArea placeholder='Reply' onChange={onReplyChange} value={reply} />
            <div className={styles.btns}>
                <SubmitBtn color='red'>Cancel</SubmitBtn>
                <div className={styles.btn}>
                    <SubmitBtn>Post</SubmitBtn>
                </div>
            </div>
        </form>
    );
}

export default NewsReplyInput;
