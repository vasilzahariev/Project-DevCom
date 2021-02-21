import styles from './index.module.css';
import { Fab, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import SimpleTextBtn from '../simple-text-btn';
import PageDiv from '../page-div';
import CreateFeedPostCard from '../create-feed-post-card';
import ConfigContext from '../../contexts/ConfigContext';
import FeedRenderer from '../feed-renderer';

const UserFeed = (props) => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const [ended, setEnded] = useState(false);
    const [open, setOpen] = useState(false);
    const [feed, setFeed] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/feed/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setFeed(response);
            setEnded(true);
            setShouldUpdate(false);
        });
    }, [feed]);

    if (!ended) {
        return (
            <PageDiv>
                <CircularProgress color="inherit" />
            </PageDiv>
        );
    }

    return (
        <div>
            <PageDiv>
                {userContext.user && userContext.user.loggedIn && userContext.user.username === props.username ? <SimpleTextBtn onClick={() => setOpen(true)}>Add a Post</SimpleTextBtn> : ''}
                {userContext.user && userContext.user.loggedIn && userContext.user.username === props.username ? <CreateFeedPostCard open={open} setOpen={setOpen} username={props.username} /> : ''}

            </PageDiv>
            <FeedRenderer feed={feed} username={props.username} setShouldUpdate={setShouldUpdate} />
        </div>
    );
}

export default UserFeed;
