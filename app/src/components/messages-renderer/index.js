import styles from './index.module.css';
import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Avatar } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import ALink from '../link';
import HeaderLink from '../header-link';
import RenderedMessage from '../rendered-message';

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
        fetch(`${restApiUrl}/chat/${props.id}/getMessages/${userContext.user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');
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
            return (
                <RenderedMessage key={message._id} index={index} message={message} />
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
