import styles from './index.module.css';
import AddForumComment from '../add-forum-comment';
import { useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import CommentCard from '../comment-card';

const CommentSection = props => {
    useEffect(() => { }, [props.comments]);

    const renderer = useMemo(() => {
        return props.comments.map((cu, index) => {
            return (
                <CommentCard key={cu.comment._id} index={index} comment={cu.comment} user={cu.user} post={props.post} forum={props.forum} mods={props.mods} />
            );
        });
    }, [props.comments]);

    return (
        <div style={{ marginLeft: '5%' }}>
            <AddForumComment postId={props.post._id} />
            <Grid style={{ marginTop: '2.5%' }} container spacing={1}>
                {renderer}
            </Grid>
        </div>
    );
}

export default CommentSection;
