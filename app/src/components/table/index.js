import styles from './index.module.css';
import { Grid } from '@material-ui/core';

const Table = props => {
    return (
        <Grid className={styles.table} container spacing={1}>
            {props.children}
        </Grid>
    );
}

export default Table;
