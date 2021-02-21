import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import FeedPostCard from '../feed-post-card';

const FeedRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.feed.map((pu, index) => {
            return (
                <FeedPostCard key={pu.post._id} index={index} post={pu.post} user={pu.user} setShouldUpdate={props.setShouldUpdate} commentsCount={pu.commentsCount} />
            );
        });
    }, [props.feed]);

    return (
        <div className={styles.feed}>
            <Grid container direction='row-reverse' spacing={4}>
                {renderer}
            </Grid>
        </div>
    );
}

export default FeedRenderer;
