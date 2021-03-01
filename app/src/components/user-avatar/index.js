import styles from './index.module.css';
import { Grid, makeStyles, Avatar, Badge, withStyles } from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const UserAvatar = props => {
    const classes = makeStyles((theme) => ({
        icon: {
            width: theme.spacing(props.size ? props.size : 10),
            height: theme.spacing(props.size ? props.size : 10)
        },
        badge: {
            width: props.size ? props.size * 3.5 : 44,
            height: props.size ? props.size * 3.5 : 44,
            color: '#059dc7',
            // backgroundColor: 'white',
            // borderRadius: '100%',
        }
    }))();

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Avatar src={props.user.profilePictureUrl} className={classes.icon} />
            </Grid>
        </Grid>
    );
}

export default UserAvatar;
