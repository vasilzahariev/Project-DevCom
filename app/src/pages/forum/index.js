import styles from './index.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Layout from '../../components/layout';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';
import PageDiv from '../../components/page-div';
import ForumInfo from '../../components/forum-info';
import ForumPosts from '../../components/forum-posts';
import { useMediaQuery } from 'react-responsive';

const Forum = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [forum, setForum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/f/${params.forumName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setForum(response.forum);
            setPosts(response.posts);
            setModerators(response.moderators);
            setMembers(response.members);
            setEnded(true);
        });
    }, [params, posts]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <Layout>
            <div style={{ marginTop: '2.5%' }}>
                {isMobile ?
                    <div>
                        <ForumInfo forum={forum} moderators={moderators} showMods={true} members={members} />
                        <ForumPosts forum={forum} posts={posts} />
                    </div>
                    :
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}>
                            <ForumPosts forum={forum} posts={posts} />
                        </Grid>
                        <Grid item xs={3}>
                            <ForumInfo forum={forum} moderators={moderators} showMods={true} members={members} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>}
            </div>
        </Layout>
    );
};

export default Forum;
