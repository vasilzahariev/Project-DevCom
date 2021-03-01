import styles from './index.module.css';
import { Grid } from '@material-ui/core';

const TableColumn = props => {
    return (
        <Grid className={styles.value} item xs={props.xs}>{props.children}</Grid>
    );
}

export default TableColumn;
