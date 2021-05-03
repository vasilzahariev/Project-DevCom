import styles from './index.module.css';
import Layout from '../../components/layout';
import { useEffect, useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useParams, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import ForumInfo from '../../components/forum-info';
import ForumPostCard from '../../components/forum-post-card';
import { useMediaQuery } from 'react-responsive';

const ForumPost = props => {
    const configContext = useContext(ConfigContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const params = useParams();
    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [forum, setForum] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/f/${params.forumName}/${params.postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/404');

            setForum(response.forum);
            setModerators(response.moderators);
            setPost(response.post);
            setComments(response.comments);
            setMembers(response.members);
            setEnded(true);
        });
    }, [comments]);

    if (!ended) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='inherit' />
            </Backdrop>
        );
    }

    return (
        <Layout>
            {isMobile ?
                <ForumPostCard mods={moderators} forum={forum} post={post.post} user={post.user} comments={comments} />
                :
                <div style={{ marginTop: '2.5%' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={7}>
                            <ForumPostCard mods={moderators} forum={forum} post={post.post} user={post.user} comments={comments} />
                        </Grid>
                        <Grid item xs={3}>
                            <ForumInfo forum={forum} moderators={moderators} showMods={false} members={members} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            }
        </Layout>
    );
}

export default ForumPost;
