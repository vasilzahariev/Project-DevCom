import styles from './index.module.css';
import { Avatar, Grid, makeStyles } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

const ForumIcon = props => {

    const classes = makeStyles((theme) => ({
        icon: {
            width: theme.spacing(props.size ? props.size : 10),
            height: theme.spacing(props.size ? props.size : 10)
        },
    }))();

    return (
        <Grid container justify="center" alignItems="center">
            <Grid className={styles.iconDiv} style={{ borderWidth: props.borderWidth ? props.borderWidth : '4px' }} item><Avatar src={props.iconUrl} className={classes.icon}><GroupIcon /></Avatar></Grid>
        </Grid>
    );
}

export default ForumIcon;
