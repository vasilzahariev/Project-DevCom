import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import SubmitBtn from '../submit-btn';
import { useState, useContext, useMemo } from 'react';
import UserContext from '../../contexts/UserContext';
import CreateForumPostDialog from '../create-forum-post-dialog';
import RenderedForumPostCard from '../rendered-forum-post-card';
import SimpleTextBtn from '../simple-text-btn';
import { useMediaQuery } from 'react-responsive';

const ForumPosts = props => {
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const [createOpen, setCreateOpen] = useState(false);
    const [sort, setSort] = useState('new');

    const sortByNew = (elem1, elem2) => {
        const post1 = elem1.post;
        const post2 = elem2.post;
        const date1 = new Date(Date.parse(`${post1.publishedDate}`));
        const date2 = new Date(Date.parse(`${post2.publishedDate}`));

        if (date1 < date2) return 1;
        else if (date1 > date2) return -1;

        return 0;
    }

    const sortByTrending = (elem1, elem2) => {
        const post1 = elem1.post;
        const post2 = elem2.post;
        const date1 = Date.now() - new Date(Date.parse(`${post1.publishedDate}`));
        const date2 = Date.now() - new Date(Date.parse(`${post2.publishedDate}`));
        const likesVal1 = post1.likes.length - post1.dislikes.length;
        const likesVal2 = post2.likes.length - post2.dislikes.length;
        
        const val1 = likesVal1 + (elem1.commentsCount * 2) - date1;
        const val2 = likesVal2 + (elem2.commentsCount * 2) - date2;

        if (val1 > val2) return 1;
        else if (val1 < val2) return -1;

        return 0;
    }

    const sortByTop = (elem1, elem2) => {
        const post1 = elem1.post;
        const post2 = elem2.post;
        const likes1 = post1.likes.length;
        const likes2 = post2.likes.length;
        const val1 = likes1 - post1.dislikes.length;
        const val2 = likes2 - post2.dislikes.length;

        if (val1 < val2) return 1;
        else if (val1 > val2) return -1;
        else if (likes1 < likes2) return 1;
        else if (likes1 > likes2) return -1;

        return 0;
    }

    const renderer = useMemo(() => {
        const posts = props.posts;

        if (sort === 'new') posts.sort(sortByNew);
        else if (sort === 'trending') posts.sort(sortByTrending);
        else if (sort === 'top') posts.sort(sortByTop);

        return posts.map((pu, index) => {
            return (
                <RenderedForumPostCard key={pu.post._id} index={index} forum={props.forum} post={pu.post} user={pu.user} />
            );
        });
    }, [props.posts]);

    return (
        <div>
            <div style={{ marginTop: isMobile ? '5%' : '0' }}>
                {userContext.user.loggedIn ? <SubmitBtn color='blue' padding='1% 2%' onClick={() => { setCreateOpen(true) }}>Create a Post</SubmitBtn> : ''}
                {userContext.user.loggedIn ? <CreateForumPostDialog open={createOpen} setOpen={setCreateOpen} forumName={props.forum.name} forumId={props.forum._id} forumTitle={props.forum.title} /> : ''}
            </div>
            <div style={{ marginTop: '2%', textAlign: 'center' }}>
                <SimpleTextBtn color='gray' onClick={() => { setSort('new') }}><span className={sort === 'new' ? styles.selected : ''}>New</span></SimpleTextBtn>
                <SimpleTextBtn color='gray' onClick={() => { setSort('trending') }}><span className={sort === 'trending' ? styles.selected : ''}>Trending</span></SimpleTextBtn>
                <SimpleTextBtn color='gray' onClick={() => { setSort('top') }}><span className={sort === 'top' ? styles.selected : ''}>Top</span></SimpleTextBtn>
            </div>
            <Grid style={{ marginTop: '2%' }} container spacing={isMobile ? 3 : 1}>
                {renderer}
            </Grid>
        </div>
    );
}

export default ForumPosts;
