import styles from './index.module.css';
import AddForumComment from '../add-forum-comment';
import { useEffect, useMemo, useContext } from 'react';
import { Grid } from '@material-ui/core';
import CommentCard from '../comment-card';
import UserContext from '../../contexts/UserContext';
import { useMediaQuery } from 'react-responsive';

const CommentSection = props => {
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    useEffect(() => { }, [props.comments]);

    const renderer = useMemo(() => {
        return props.comments.map((cu, index) => {
            return (
                <CommentCard key={cu.comment._id} index={index} comment={cu.comment} user={cu.user} post={props.post} forum={props.forum} mods={props.mods} />
            );
        });
    }, [props.comments]);

    return (
        <div style={{ marginLeft: isMobile ? '1%' : '5%' }}>
            {userContext.user.loggedIn ? <AddForumComment postId={props.post._id} /> : ''}
            <Grid style={{ marginTop: '2.5%' }} container spacing={1}>
                {renderer}
            </Grid>
        </div>
    );
}

export default CommentSection;
