import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import HeaderLink from '../header-link';

const FeedPostRepliesRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.comments.map((cu, index) => {
            return (
                <Grid key={cu.comment._id} index={index} item>
                    <p><HeaderLink to={`/u/${cu.user.username}`}>@{cu.user.username}:</HeaderLink> {cu.comment.content}</p>
                </Grid>
            );
        });
    }, [props.comments]);
    
    return (
        <Grid container direction='column' justify="center" alignItems="center">
            {renderer}
        </Grid>
    );
}

export default FeedPostRepliesRenderer;
