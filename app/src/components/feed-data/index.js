import styles from './index.module.css';
import { Grid } from '@material-ui/core';

const FeedData = props => {
    return (
        <div className={styles.marginUp}>
            <Grid className={styles.table} container spacing={1}>
                <Grid className={styles.head} item xs={12}>
                    <Grid container>
                        <Grid className={styles.value} item xs={1}><b>#</b></Grid>
                        <Grid className={styles.value} item xs={4}><b>Content</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Likes</b></Grid>
                        <Grid className={styles.value} item xs={1}><b>Comments</b></Grid>
                        <Grid className={styles.value} item xs={5}><b>Actions</b></Grid>
                    </Grid>
                </Grid>
                <Grid className={styles.row} item xs={12}>
                    <Grid container>
                        <Grid className={styles.value} item xs={1}>0</Grid>
                        <Grid className={styles.value} item xs={4}>Test</Grid>
                        <Grid className={styles.value} item xs={1}>2</Grid>
                        <Grid className={styles.value} item xs={1}>9</Grid>
                        <Grid className={styles.value} item xs={5}><button>delete</button></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default FeedData;
