import styles from './index.module.css';
import { Grid } from '@material-ui/core';

const TableHead = props => {
    return (
        <Grid className={styles.head} item xs={12}>
            <Grid container>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default TableHead;
