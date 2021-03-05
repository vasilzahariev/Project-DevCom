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
            width: props.size ? props.size * 2.5 : 44,
            height: props.size ? props.size * 2.5 : 44,
        }
    }))();

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Badge anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} badgeContent={<p>{props.user.isAdmin ? <SupervisedUserCircleIcon style={{ color: '#61dafb' }} className={classes.badge} /> : (props.user.isJournalist ? <AssignmentIndIcon style={{ color: '#ce35ce' }} className={classes.badge} /> : (props.user.isVerified ? <VerifiedUserIcon style={{ color: '#FFD700' }} className={classes.badge} /> : ''))}</p>}>
                    <Avatar src={props.user.profilePictureUrl} className={classes.icon} />
                </Badge>
            </Grid>
        </Grid>
    );
}

export default UserAvatar;
