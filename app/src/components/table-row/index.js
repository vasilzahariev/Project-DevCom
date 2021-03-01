import styles from './index.module.css';
import { Grid } from '@material-ui/core';

const TableRow = props => {
    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container alignItems='center'>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default TableRow;
