import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import UserAvatar from '../user-avatar';
import ALink from '../link';
import { useRef, useState, useEffect, useContext } from 'react';
import CommentSection from '../comment-section';
import UserContext from '../../contexts/UserContext';
import ForumLikeButton from '../forum-like-button';
import ConfigContext from '../../contexts/ConfigContext';
import ForumDislikeBtn from '../forum-dislike-btn';
import SubmitBtn from '../submit-btn';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import EditForumPostDialog from '../edit-forum-post-dialog';
import HeaderLink from '../header-link';
import { useMediaQuery } from 'react-responsive';

const ForumPostCard = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const date = new Date(Date.parse(`${props.post.publishedDate}`));

    const history = useHistory();

    const contentBlock = useRef(null);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        contentBlock.current.innerHTML = props.post.content;
    }, [props.post.content]);

    const checkIfUserIsModOrOwner = () => {
        if (!userContext.user.loggedIn) return false;

        if (userContext.user._id === props.forum.ownerId) return true;

        for (const mod of props.mods)
            if (mod.moderator.userId === userContext.user._id) return true;

        return false;
    }

    const checkIfAuthorIsMod = () => {
        for (const mod of props.mods)
            if (mod.moderator.userId === props.post.authorId) return true;

        return false;
    }

    const checkIfAuthorIsOwner = () => {
        return props.post.authorId === props.forum.ownerId;
    }

    const deletePost = async e => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        history.push(`/forum/f/${props.forum.name}`);

        const promise = await fetch(`${configContext.restApiUrl}/forum/deletePost/${props.post._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
        else {
            history.push(`/forum/f/${props.forum.name}`);
        }
    }

    return (
        <div>
            <div>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid item xs={12}>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <h2>{props.post.title}</h2>
                            </Grid>
                            <Grid item>
                                <h2>{isMobile ? <HeaderLink to={`/forum/f/${props.forum.name}`}><i>/f/{props.forum.name}</i></HeaderLink> : ''}</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item><UserAvatar user={props.user} size={6} /></Grid>
                            <Grid item><HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink>{checkIfAuthorIsMod() ? (checkIfAuthorIsOwner() ? ' (Owner)' : ' (Mod)') : ''}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {date.toLocaleDateString()}
                    </Grid>
                </Grid>
                <hr />
                <div style={{ padding: '2%' }} ref={contentBlock}>
                </div>
                {props.post.coverImageUrl ? <div><img className={styles.img} src={props.post.coverImageUrl} alt='Cover' /></div> : ''}
                <hr />
                <div style={{ padding: '0 2%' }}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <Grid container alignItems='center' spacing={3}>
                                <Grid item>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item>
                                            <ForumLikeButton likes={props.post.likes} fetchUrl={`${configContext.restApiUrl}/forum/likePost/${props.post._id}`} fontSize='1.8rem' />
                                        </Grid>
                                        <Grid item>
                                            <p style={{ fontSize: '1.5rem' }}>{props.post.likes.length}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item>
                                            <ForumDislikeBtn dislikes={props.post.dislikes} fetchUrl={`${configContext.restApiUrl}/forum/dislikePost/${props.post._id}`} fontSize='1.8rem' />
                                        </Grid>
                                        <Grid item>
                                            <p style={{ fontSize: '1.5rem' }}>{props.post.dislikes.length}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {userContext.user.loggedIn && (userContext.user._id === props.post.authorId || checkIfUserIsModOrOwner()) ?
                            <Grid item>
                                <Grid container alignItems='center' spacing={4}>
                                    {userContext.user._id !== props.post.authorId ? '' : <Grid item>
                                        <SubmitBtn color='yellow' padding={isMobile ? '15% 20% 10% 20%' : '25% 30% 20% 30%'} borderRadius='100%' onClick={() => { setEditOpen(true) }}><EditIcon style={{ fontSize: '2rem' }} /></SubmitBtn>
                                    </Grid>}
                                    <Grid item>
                                        <SubmitBtn color='red' padding={isMobile ? '15% 20% 10% 20%' : '25% 30% 20% 30%'} borderRadius='100%' onClick={deletePost}><DeleteIcon style={{ fontSize: '2rem' }} /></SubmitBtn>
                                    </Grid>
                                </Grid>
                                <EditForumPostDialog open={editOpen} setOpen={setEditOpen} post={props.post} forumTitle={props.forum.title} forumName={props.forum.name} />
                            </Grid> : ''}
                    </Grid>
                </div>
            </div>
            <div style={{ marginTop: '5%' }}>
                <h2>Comments ({props.comments.length})</h2>
                <CommentSection post={props.post} comments={props.comments} forum={props.forum} mods={props.mods} />
            </div>
        </div>
    );
}

export default ForumPostCard;
