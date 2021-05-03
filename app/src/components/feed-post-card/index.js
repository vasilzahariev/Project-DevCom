import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useRef, useEffect, useContext, useState } from 'react';
import HeaderLink from '../header-link';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import CommentIcon from '@material-ui/icons/Comment';
import FeedPostCommentDialog from '../feed-post-comment-dialog';
import { Link } from 'react-router-dom';
import UserAvatar from '../user-avatar';
import { useMediaQuery } from 'react-responsive';

const FeedPostCard = (props) => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const contentDiv = useRef(null);

    const date = new Date(Date.parse(`${props.post.date}`));

    const [commentOpen, setCommentOpen] = useState(false);

    useEffect(() => {
        contentDiv.current.innerHTML = props.post.content;
    }, [props]);

    const like = async e => {
        e.preventDefault();

        const body = {
            userId: userContext.user._id,
            postId: props.post._id
        }

        await fetch(`${configContext.restApiUrl}/feed/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        props.setShouldUpdate(true);
    }

    const comment = e => {
        e.preventDefault();

        setCommentOpen(true);
    }

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <div className={styles.userPart}>
                    <Grid container justify='flex-start' alignItems='center'>
                        <Grid item xs={isMobile ? 2 : 1}>
                            <HeaderLink to={`/u/${props.user.username}`}><UserAvatar user={props.user} size={isMobile ? 4 : 6} /></HeaderLink>
                        </Grid>
                        <Grid item xs={isMobile ? 7 : 9}>
                            <HeaderLink to={`/u/${props.user.username}`}>{props.user.fullName} <span className={styles.username}>@{props.user.username}</span></HeaderLink>
                        </Grid>
                        <Grid item xs={isMobile ? 3 : 2}>
                            <p className={styles.date}>{date.toLocaleDateString()}</p>
                        </Grid>
                    </Grid>
                </div>
                {props.post.imageUrl ? <div style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}><img style={{ maxWidth: '90%', maxHeight: '300px' }} src={props.post.imageUrl} alt='Image' /></div> : ''}
                <div className={styles.contentBlock} ref={contentDiv}></div>
                <div>{}</div>
                <div className={styles.btns}>
                    <Grid container justify="space-evenly" alignItems='center'>
                        {userContext.user && userContext.user.loggedIn ?
                            <Grid item>
                                <button title={props.post.likes.includes(userContext.user._id) ? 'Unlike' : 'Like'} onClick={like} className={`${styles.btn} ${props.post.likes.includes(userContext.user._id) ? styles.liked : styles.like}`}>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item>
                                            {props.post.likes.includes(userContext.user._id) ? <FavoriteIcon style={{ fontSize: 30 }} /> : <FavoriteBorderIcon style={{ fontSize: 30 }} />}
                                        </Grid>
                                        <Grid item>
                                            {props.post.likes.length}
                                        </Grid>
                                    </Grid>
                                </button>
                            </Grid>
                            : ''}

                        {userContext.user && userContext.user.loggedIn ?
                            <Grid item>
                                <button title='Comment' onClick={comment} className={`${styles.btn} ${styles.comment}`}>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item>
                                            <CommentIcon style={{ fontSize: 30 }} />
                                        </Grid>
                                        <Grid item>
                                            {props.commentsCount}
                                        </Grid>
                                    </Grid>
                                </button>
                            </Grid>
                            : ''}
                    </Grid>
                </div>

                {(userContext.user && userContext.user.loggedIn) ? <FeedPostCommentDialog open={commentOpen} setOpen={setCommentOpen} postId={props.post._id} /> : ''}
            </div>
        </Grid>
    );
}

export default FeedPostCard;
