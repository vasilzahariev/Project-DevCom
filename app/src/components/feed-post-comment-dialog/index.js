import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import TextArea from '../text-area';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import FeedPostRepliesRenderer from '../feed-post-replies-renderer';

const FeedPostCommentDialog = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const [ended, setEnded] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [commentErr, setCommentErr] = useState('');

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/feed/${props.postId}/getComments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setComments(response);
            setEnded(true);
        });
    }, [comments]);

    const onCommentChange = e => {
        const val = e.target.value;

        if (val.length === 0) setCommentErr('Comment should be at least 1 character long');
        else setCommentErr('');

        setComment(val);
    }

    const onClearClose = e => {
        props.setOpen(false);
        setComment('');
        setCommentErr('');
    }

    const create = async e => {
        const body = {
            userId: userContext.user._id,
            postId: props.postId,
            content: comment,
            imageUrl: ''
        }

        const promise = await fetch(`${configContext.restApiUrl}/feed/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        onClearClose();
    }

    return (
        <Dialog open={props.open} scroll='paper' fullWidth={true} maxWidth='md' onClose={onClearClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={styles.title} id='form-dialog-title'>
                {ended ? <FeedPostRepliesRenderer comments={comments} /> : <CircularProgress color='inherit' />}
            </DialogTitle>
            <DialogContent className={styles.dialog}>
                <TextArea label='Comment' height={50} value={comment} onChange={onCommentChange} placeholder='Comment' err={commentErr} />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn2} type='button' onClick={onClearClose} value='Close' />
                <input className={styles.btn2} type='button' onClick={create} value='Comment' />
            </DialogActions>
        </Dialog>
    );
}

export default FeedPostCommentDialog;
