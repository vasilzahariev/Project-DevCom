import styles from './index.module.css';
import Layout from '../../components/layout';
import { useState, useEffect, useContext, useMemo } from 'react';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory, useParams } from 'react-router-dom';
import SimpleTextBtn from '../../components/simple-text-btn';
import SubmitBtn from '../../components/submit-btn';
import StartAConversationDialog from '../../components/start-a-conversation-dialog';
import ChatRenderer from '../../components/chat-renderer';
import { useMediaQuery } from 'react-responsive';

const Chat = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [chats, setChats] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/chat/getChats/${userContext.user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) {
                history.push('/500');
            } else {
                setChats(response.chats);

                if (params.id && selectedChatId === null && response.chats.find(chat => chat._id === params.id)) {
                    setSelectedChatId(params.id);
                }

                setEnded(true);
            }
        });
    }, [chats]);

    const getChatNameFromUsers = users => {
        if (users.length === 1) {
            return users[0].fullName;
        } else if (users.length === 2) {
            if (users[0]._id === userContext.user._id)
                return users[1].fullName;
            else
                return users[0].fullName;
        } else {
            let result = '';

            for (let i = 0; i < 2; i++) {
                const user = users[i];

                if (i === 1)
                    result += user.fullName;
                else
                    result += user.fullName + ', ';
            }

            result += `+ ${users.length - 2}`;

            return result;
        }
    }

    const renderer = useMemo(() => {
        return chats.map((chat, index) => {
            return (
                <Grid key={chat._id} index={index} item xs={12}>
                    <div className={styles.convo} onClick={() => { setSelectedChatId(chat._id) }}>
                        <p>{chat.name ? (chat.name.length > 30 ? `${String(chat.name).substring(0, 29).trim()}...` : chat.name) : (getChatNameFromUsers(chat.users).length > 30 ? `${String(getChatNameFromUsers(chat.users)).substring(0, 29).trim()}...` : getChatNameFromUsers(chat.users))}{chat.unread === 0 ? '' : ` (${chat.unread})`}</p>
                    </div>

                    {isMobile && selectedChatId === chat._id ?
                        <ChatRenderer chatId={selectedChatId} />
                        :
                        ''
                    }
                </Grid>
            );
        })
    }, [chats]);

    if (!ended) {
        <Backdrop open={true}>
            <CircularProgress color='inherit' />
        </Backdrop>
    }

    return (
        <Layout>
            <div className={styles.page}>
                {isMobile ?
                    <div>
                        <SubmitBtn color='blue' borderRadius='7.5px' onClick={() => { setOpen(true) }}>Start a Conversation</SubmitBtn>
                        <StartAConversationDialog open={open} setOpen={setOpen} setSelectedChatId={setSelectedChatId} />

                        <div className={styles.convos}>
                            <Grid container spacing={1}>
                                {renderer}
                            </Grid>
                        </div>
                    </div>
                    :
                    <Grid container spacing={5}>
                        <Grid item xs={2}>
                            <SubmitBtn color='blue' borderRadius='7.5px' onClick={() => { setOpen(true) }}>Start a Conversation</SubmitBtn>
                            <StartAConversationDialog open={open} setOpen={setOpen} setSelectedChatId={setSelectedChatId} />
                            <div className={styles.convos}>
                                <Grid container spacing={1}>
                                    {renderer}
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <ChatRenderer chatId={selectedChatId} />
                        </Grid>
                    </Grid>
                }
            </div>
        </Layout>
    );
}

export default Chat;
