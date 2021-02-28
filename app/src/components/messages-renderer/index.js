import styles from './index.module.css';
import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Avatar } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import ALink from '../link';
import HeaderLink from '../header-link';

const MessagesRenderer = props => {
    const restApiUrl = useContext(ConfigContext).restApiUrl;
    const userContext = useContext(UserContext);

    const history = useHistory();

    const scroll = useRef(null);

    const [ended, setEnded] = useState(false);
    const [messages, setMessages] = useState([]);

    const updateScroll = () => {
        if (!scroll.current) return;

        scroll.current.scrollTop = scroll.current.scrollHeight;
    }

    useEffect(() => {
        updateScroll();
    }, []);

    useEffect(() => {
        fetch(`${restApiUrl}/chat/${props.id}/getMessages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/505');
            else {
                setMessages(response.messages);
                setEnded(true);

                if (messages.length !== response.messages.length) {
                    console.log(`${messages.length} ${response.messages.length}`);
                    updateScroll();
                }
            }
        });
    }, [messages]);

    const renderer = useMemo(() => {
        return messages.map((message, index) => {
            const isUser = message.user._id === userContext.user._id;
            const date = new Date(Date.parse(`${message.date}`));

            return (
                <div key={message._id} index={index}>
                    <Grid container justify='flex-start' alignItems='center' spacing={2}>
                        <Grid item><Avatar src={message.user.profilePictureUrl}/></Grid>
                        <Grid item><HeaderLink to={`/u/${message.user.username}`}>{message.user.username}</HeaderLink>{isUser ? ' (You)' : ''}</Grid>
                        <Grid className={styles.date} item>{date.toLocaleString()}</Grid>
                    </Grid>
                    <div className={`${styles.message}`}>
                        {message.content}
                    </div>
                </div>
            );
        });
    }, [messages]);

    if (!ended) {
        return (<CircularProgress color='inherit' />);
    }

    return (
        <div className={styles.chatBlock} id='test' ref={scroll}>
            {renderer}
        </div>
    );
}

export default MessagesRenderer;
