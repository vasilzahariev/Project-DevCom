import styles from './index.module.css';
import { Avatar, Grid } from '@material-ui/core';
import HeaderLink from '../header-link';
import { useContext, useRef, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';

const RenderedMessage = props => {
    const userContext = useContext(UserContext);

    const isUser = props.message.user._id === userContext.user._id;
    const date = new Date(Date.parse(`${props.message.date}`));

    const messageRef = useRef(null);

    useEffect(() => {
        messageRef.current.innerHTML = props.message.content;
    }, [])

    return (
        <div>
            <Grid container justify='flex-start' alignItems='center' spacing={2}>
                <Grid item><Avatar src={props.message.user.profilePictureUrl}/></Grid>
                <Grid item><HeaderLink to={`/u/${props.message.user.username}`}>{props.message.user.username}</HeaderLink>{isUser ? ' (You)' : ''}</Grid>
                <Grid className={styles.date} item>{date.toLocaleString()}</Grid>
            </Grid>
            <div ref={messageRef} className={`${styles.message}`}>
            </div>
        </div>
    );
}

export default RenderedMessage;
