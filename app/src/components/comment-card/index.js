import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import UserAvatar from '../user-avatar';
import ALink from '../link';
import { useRef, useEffect, useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import SubmitBtn from '../submit-btn';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory } from 'react-router-dom';
import ForumLikeButton from '../forum-like-button';
import ForumDislikeBtn from '../forum-dislike-btn';
import EpicProgrammer from '../epic-programmer';
import EditFourmComment from '../edit-forum-comment';
import HeaderLink from '../header-link';

const CommentCard = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const date = new Date(Date.parse(`${props.comment.date}`));
    const commentRef = useRef(null);

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        commentRef.current.innerHTML = props.comment.content;
    }, [props.comment.content]);

    const checkIfIsOP = () => {
        return props.comment.userId === props.post.authorId;
    }

    const checkIfUserIsModOrOwner = () => {
        if (!userContext.user.loggedIn) return false;

        if (userContext.user._id === props.forum.ownerId) return true;

        for (const mod of props.mods)
            if (mod.moderator.userId === userContext.user._id) return true;

        return false;
    }

    const deleteComment = async e => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        const body = {
            commentId: props.comment._id
        };

        const promise = await fetch(`${configContext.restApiUrl}/forum/deleteComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    const answer = async answerVal => {
        const body = {
            id: props.comment._id,
            answer: answerVal
        };

        const promise = await fetch(`${configContext.restApiUrl}/forum/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <Grid item xs={12}>
            <div className={`${styles.card} ${props.comment.answer ? styles.answer : styles.normal}`}>
                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={1}>
                            <Grid item>
                                <ForumLikeButton likes={props.comment.likes} fetchUrl={`${configContext.restApiUrl}/forum/likeComment/${props.comment._id}`} />
                            </Grid>
                            <Grid item>
                                {props.comment.likes.length - props.comment.dislikes.length}
                            </Grid>
                            <Grid item>
                                <ForumDislikeBtn dislikes={props.comment.dislikes} fetchUrl={`${configContext.restApiUrl}/forum/dislikeComment/${props.comment._id}`} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11}>
                        {props.comment.answer ? <div style={{ marginBottom: '2%' }}><EpicProgrammer><b>Answer</b></EpicProgrammer></div> : ''}
                        <div className={styles.comment} ref={commentRef}>
                        </div>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                {date.toLocaleDateString()}
                            </Grid>
                            <Grid item>
                                <Grid container alignItems='center' spacing={1}>
                                    <Grid item><UserAvatar pfp={props.user.profilePictureUrl} size={5} /></Grid>
                                    <Grid item><HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink>{checkIfIsOP() ? ' (OP)' : ''}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div>
                            <div className={styles.btns}>
                                {userContext.user.loggedIn && (userContext.user._id === props.comment.userId || checkIfUserIsModOrOwner()) ? <div className={styles.btn}><SubmitBtn color='red' borderRadius='100%' onClick={deleteComment}><DeleteIcon /></SubmitBtn></div> : ''}
                                {userContext.user.loggedIn && userContext.user._id === props.comment.userId ? <div className={styles.btn}><SubmitBtn color='yellow' borderRadius='100%' onClick={() => { setEditOpen(true) }}><EditIcon /></SubmitBtn></div> : ''}
                                {userContext.user.loggedIn && userContext.user._id === props.post.authorId ?
                                    (props.comment.answer ?
                                        (<div className={styles.btn}><SubmitBtn borderRadius='100%' title='Remove as answer' color='red' onClick={() => { answer(false) }}><ClearIcon /></SubmitBtn></div>) :
                                        (<div className={styles.btn}><SubmitBtn borderRadius='100%' title='Mark as answer' color='green' onClick={() => { answer(true) }}><CheckIcon /></SubmitBtn></div>)) : ''}

                                {userContext.user.loggedIn && userContext.user._id === props.comment.userId && editOpen ? <EditFourmComment comment={props.comment} open={editOpen} setOpen={setEditOpen} /> : ''}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

export default CommentCard;
