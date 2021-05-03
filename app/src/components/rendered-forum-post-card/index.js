import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import SimpleTextBtn from '../simple-text-btn';
import ALink from '../link';
import { useHistory } from 'react-router-dom';
import ForumLikeButton from '../forum-like-button';
import { useContext, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import ForumDislikeBtn from '../forum-dislike-btn';
import HeaderLink from '../header-link';
import ForumIcon from '../forum-icon';
import { useMediaQuery } from 'react-responsive';

const RenderedForumPostCard = props => {
    const configContext = useContext(ConfigContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const date = new Date(Date.parse(`${props.post.publishedDate}`));

    const history = useHistory();

    useEffect(() => { }, [props]);

    const onClick = e => {
        history.push(`/forum/f/${props.forum.name}/${props.post._id}`);
    }

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <Grid container spacing={2}>
                    {isMobile ? '' : <Grid className={styles.btns} item xs={1}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item>
                                <Grid container alignItems='center' spacing={1}>
                                    <Grid item><ForumLikeButton likes={props.post.likes} fetchUrl={`${configContext.restApiUrl}/forum/likePost/${props.post._id}`} /></Grid>
                                    <Grid item>{props.post.likes.length}</Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems='center' spacing={1}>
                                    <Grid item><ForumDislikeBtn dislikes={props.post.dislikes} fetchUrl={`${configContext.restApiUrl}/forum/dislikePost/${props.post._id}`} /></Grid>
                                    <Grid item>{props.post.dislikes.length}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>}
                    <Grid item xs={isMobile ? 12 : 11}>
                        <div className={styles.title} onClick={onClick}>
                            {props.post.title}
                            {props.post.coverImageUrl ? <div style={{ marginTop: '3%' }}><img className={styles.img} src={props.post.coverImageUrl} alt='Cover' /></div> : ''}
                        </div>
                        <Grid style={{ marginTop: '2%' }} container justify={isMobile ? 'space-evenly' : "space-between"} alignItems="center">
                            <Grid item onClick={onClick}>
                                {date.toLocaleDateString()}
                            </Grid>
                            <Grid item>
                                <HeaderLink to={`/forum/f/${props.forum.name}`}>
                                    <Grid container justify='center' alignItems='center' spacing={1}>
                                        <Grid item>
                                            <ForumIcon iconUrl={props.forum.iconUrl} size={4} borderWidth='2px' />
                                        </Grid>
                                        <Grid item>
                                            /f/{props.forum.name}
                                        </Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                by <HeaderLink to={`/u/${props.user.username}`}>@{props.user.username}</HeaderLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {isMobile ?
                    <Grid style={{ marginTop: '1%' }} container direction='row' alignItems='center' justify='center' spacing={5}>
                        <Grid item>
                            <Grid container alignItems='center' spacing={1}>
                                <Grid item><ForumLikeButton likes={props.post.likes} fetchUrl={`${configContext.restApiUrl}/forum/likePost/${props.post._id}`} /></Grid>
                                <Grid item>{props.post.likes.length}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems='center' spacing={1}>
                                <Grid item><ForumDislikeBtn dislikes={props.post.dislikes} fetchUrl={`${configContext.restApiUrl}/forum/dislikePost/${props.post._id}`} /></Grid>
                                <Grid item>{props.post.dislikes.length}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    : ''}
            </div>
        </Grid>
    );
}

export default RenderedForumPostCard;
