import styles from './index.module.css';
import { Grid, CircularProgress } from '@material-ui/core';
import RenderedForumPostCard from '../rendered-forum-post-card';
import { useMemo, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ConfigContext from '../../contexts/ConfigContext';

const SearchForumPostsRenderer = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [posts, setPosts] = useState([]);

    const sortPosts = (a, b) => {
        const title1 = a.post.title.toLowerCase();
        const title2 = b.post.title.toLowerCase();

        if (title1 < title2) return -1;
        else if (title1 > title2) return 1;

        return 0;
    }

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/getUserPosts/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/505');

            setPosts(response.posts.filter(post => {
                if (post.post.title.toLowerCase().includes(props.searchValue)) return post;
            }).sort(sortPosts));
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
        <div className={styles.block}>
            <Grid container spacing={1} justify='center'>
                {posts.length === 0 ? <p>No Forum Posts Found</p> : renderer }
            </Grid>
        </div>
    );
}

export default SearchForumPostsRenderer;
