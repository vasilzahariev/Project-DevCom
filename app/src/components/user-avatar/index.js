import styles from './index.module.css';
import { Grid, makeStyles, Avatar } from '@material-ui/core';

const UserAvatar = props => {
    const classes = makeStyles((theme) => ({
        icon: {
            width: theme.spacing(props.size ? props.size : 10),
            height: theme.spacing(props.size ? props.size : 10)
        },
    }))();

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item><Avatar src={props.pfp} className={classes.icon} /></Grid>
        </Grid>
    );
}

export default UserAvatar;
