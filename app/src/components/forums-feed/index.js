import styles from './index.module.css';
import { useContext, useState, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { Grid, CircularProgress } from '@material-ui/core';
import RenderedForumPostCard from '../rendered-forum-post-card';
import { useMediaQuery } from 'react-responsive';

const ForumsFeed = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/getUserForumFeed/${userContext.user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setPosts(response.posts);
            setEnded(true);
        });
    }, [posts]);

    const renderer = useMemo(() => {
        return posts.map((postObj, index) => {
            return (
                <RenderedForumPostCard key={postObj.post._id} index={index} forum={postObj.forum} post={postObj.post} user={postObj.user} />
            );
        });
    }, [posts]);

    if (!ended) {
        return (
            <CircularProgress color='inherit' />
        );
    }

    return (
        <div>
            <Grid container spacing={isMobile ? 2 : 1}>
                {posts.length === 0 ? 'Nothing to show yet. Join a community' : renderer}
            </Grid>
        </div>
    );
}

export default ForumsFeed;
