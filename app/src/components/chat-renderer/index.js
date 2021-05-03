import styles from './index.module.css';
import { useEffect, useContext, useState, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Grid, Collapse } from '@material-ui/core';
import EpicProgrammer from '../epic-programmer';
import UserContext from '../../contexts/UserContext';
import TextArea from '../text-area';
import SendIcon from '@material-ui/icons/Send';
import Input from '../input';
import SubmitBtn from '../submit-btn';
import ImageIcon from '@material-ui/icons/Image';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ALink from '../link';
import SimpleTextBtn from '../simple-text-btn';
import CancelIcon from '@material-ui/icons/Cancel';
import MessagesRenderer from '../messages-renderer';
import HeaderLink from '../header-link';
import DialogWindow from '../dialog-window';
import ImageInput from '../image-input';
import { useMediaQuery } from 'react-responsive';

const ChatRenderer = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [chat, setChat] = useState(null);
    const [users, setUsers] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    const [uploadImgOpen, setUploadImgOpen] = useState(false);

    const [message, setMessage] = useState('');

    const onMessageChange = e => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        if (!props.chatId) return;
        setEnded(false);

        fetch(`${configContext.restApiUrl}/chat/${props.chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');
            else {
                setChat(response.chat);
                setUsers(response.users);
                setEnded(true);
                setMessage('');
                setShowMembers(false);
            }
        });
    }, [props.chatId]);

    const getChatNameFromUsers = () => {
        if (users.length === 1) {
            return users[0].fullName;
        } else {
            let result = '';

            for (const user of users) {
                if (user._id === userContext.user._id) continue;

                if (user === users[users.length - 1]) result += user.fullName;
                else result += user.fullName + ', ';
            }

            return result;
        }
    }

    const userComparer = (a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase())
            return -1;
        else if (a.username.toLowerCase() > b.username.toLowerCase())
            return 1;
        else
            return 0;
    }

    const membersRenderer = useMemo(() => {
        return users.sort((a, b) => userComparer(a, b)).map((u, index) => {
            const owner = u._id === chat.creatorId;
            const isCurrentUserOwner = chat.creatorId === userContext.user._id;

            return (
                <Grid key={u._id} index={index} item xs={12}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item><HeaderLink to={`/u/${u.username}`}>{u.username}</HeaderLink>{owner ? ' (Owner)' : ''}</Grid>
                        {isCurrentUserOwner && !owner ? <Grid item><SimpleTextBtn color='red'><CancelIcon /></SimpleTextBtn></Grid> : ''}
                    </Grid>
                </Grid>
            );
        });
    }, [users]);

    const send = async e => {
        e.preventDefault();

        if (!message) return;

        const body = {
            conversationId: chat._id,
            content: message,
            userId: userContext.user._id,
            username: userContext.user.username
        };

        const promise = await fetch(`${configContext.restApiUrl}/chat/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/500');
        } else {
            setMessage('');
        }
    }

    const sendImg = async url => {
        const body = {
            conversationId: chat._id,
            content: `<img style='max-width: 50%; max-height: 250px' src='${url}' alt='image' />`,
            userId: userContext.user._id,
            username: userContext.user.username
        };

        const promise = await fetch(`${configContext.restApiUrl}/chat/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/500');
        } else {
            setMessage('');
            setUploadImgOpen(false);
        }
    }

    const leaveChat = async e => {
        if (!window.confirm('Are you sure you want to leave this conversation?')) return;

        const body = {
            userId: userContext.user._id,
            conversationId: chat._id
        }

        const promise = await fetch(`${configContext.restApiUrl}/chat/leaveChat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/500');

            return;
        }

        history.push('/chat');
    }

    if (!props.chatId) {
        return (<div></div>);
    }

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <div>
            {isMobile ?
                <div>
                    <div className={styles.chatBlock}>
                        <MessagesRenderer id={chat._id} />
                    </div>
                    <div className={styles.input}>
                        <Grid container justify='center' alignItems='center' spacing={1}>
                            <Grid className={styles.cool} item xs={2}>
                                <SubmitBtn title='Upload Image' padding='10% 15%' color='blue' onClick={() => { setUploadImgOpen(true) }}><ImageIcon /></SubmitBtn>
                                {uploadImgOpen ?
                                    <DialogWindow open={uploadImgOpen} onClearClose={() => { setUploadImgOpen(false) }} title='Upload Image'>
                                        <ImageInput setUrl={url => sendImg(url)} />
                                    </DialogWindow> : ''}
                            </Grid>
                            <Grid className={styles.cool} item xs={8}><Input placeholder='Aa' height={25} value={message} onChange={onMessageChange} /></Grid>
                            <Grid className={styles.cool} item xs={2}><div className={styles.send}><SubmitBtn title='Send' padding='10% 15%' color='blue' onClick={send}><SendIcon /></SubmitBtn></div></Grid>
                        </Grid>
                    </div>
                </div>
                :
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <div className={styles.chatBlock}>
                            <MessagesRenderer id={chat._id} />
                        </div>
                        <div className={styles.input}>
                            <Grid container justify='center' alignItems='center' spacing={1}>
                                <Grid className={styles.cool} item xs={1}>
                                    <SubmitBtn title='Upload Image' padding='10% 15%' color='blue' onClick={() => { setUploadImgOpen(true) }}><ImageIcon /></SubmitBtn>
                                    {uploadImgOpen ?
                                        <DialogWindow open={uploadImgOpen} onClearClose={() => { setUploadImgOpen(false) }} title='Upload Image'>
                                            <ImageInput setUrl={url => sendImg(url)} />
                                        </DialogWindow> : ''}
                                </Grid>
                                <Grid className={styles.cool} item xs={10}><TextArea placeholder='Aa' height={25} value={message} onChange={onMessageChange} /></Grid>
                                <Grid className={styles.cool} item xs={1}><div className={styles.send}><SubmitBtn title='Send' padding='10% 15%' color='blue' onClick={send}><SendIcon /></SubmitBtn></div></Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={styles.card}>
                            <div className={styles.center}><b><EpicProgrammer>{chat.name ? chat.name : getChatNameFromUsers()}</EpicProgrammer></b></div>
                            <div className={styles.members}>
                                <Grid className={styles.membersBtn} container justify="space-between" onClick={() => { setShowMembers(!showMembers) }}>
                                    <Grid item>Chat Members</Grid>
                                    <Grid item>{showMembers ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Grid>
                                </Grid>
                                <Collapse in={showMembers}>
                                    <div className={styles.rendered}>
                                        <Grid container>
                                            {membersRenderer}
                                        </Grid>
                                    </div>
                                </Collapse>
                                {chat.creatorId !== userContext.user._id ? <div style={{ marginTop: '5%', textAlign: 'right' }}>
                                    <SubmitBtn color='red' onClick={leaveChat}>Leave Chat</SubmitBtn>
                                </div> : ''}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            }
        </div>
    );
}

export default ChatRenderer;
