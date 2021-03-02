import styles from './index.module.css';
import { useParams } from 'react-router-dom';
import Layout from '../layout';
import PageDiv from '../page-div';
import HeaderLink from '../header-link';
import { Grid } from '@material-ui/core';
import EpicProgrammer from '../epic-programmer';
import SearchNewsRenderer from '../search-news-renderer';
import SearchForumPostsRenderer from '../search-forum-posts-renderer';
import SearchJobsRenderer from '../search-jobs-renderer';
import SearchProjectsRenderer from '../search-projects-renderer';
import SearchUsersRenderer from '../search-users-renderer';

const Search = props => {
    const params = useParams();

    const cat = params.category === 'news' ? 'News Artilces' : (params.category === 'forum' ? 'Forum Posts' : (params.category === 'jobs' ? 'Jobs' : (params.category === 'projects' ? 'Projects' : (params.category === 'users' ? 'Users' : ''))));

    return (
        <Layout>
            <PageDiv>
                <h1><EpicProgrammer><b>Search Results for:</b></EpicProgrammer> {decodeURIComponent(params.searchValue)}</h1>
                <h3><EpicProgrammer>Category:</EpicProgrammer> {cat}</h3>
                <Grid container justify='center' alignItems='center' spacing={2}>
                    <Grid item>
                        <HeaderLink to={`/search/news/${params.searchValue}`}>News</HeaderLink>
                    </Grid>
                    <Grid item>
                        <HeaderLink to={`/search/forum/${params.searchValue}`}>Forum Posts</HeaderLink>
                    </Grid>
                    <Grid item>
                        <HeaderLink to={`/search/jobs/${params.searchValue}`}>Jobs</HeaderLink>
                    </Grid>
                    <Grid item>
                        <HeaderLink to={`/search/projects/${params.searchValue}`}>Projects</HeaderLink>
                    </Grid>
                    <Grid item>
                        <HeaderLink to={`/search/users/${params.searchValue}`}>Users</HeaderLink>
                    </Grid>
                </Grid>

                <div style={{ marginTop: '2%' }}>
                    {params.category === 'news' ? <SearchNewsRenderer searchValue={decodeURIComponent(params.searchValue)} /> : ''}
                    {params.category === 'forum' ? <SearchForumPostsRenderer searchValue={decodeURIComponent(params.searchValue)} /> : ''}
                    {params.category === 'jobs' ? <SearchJobsRenderer searchValue={decodeURIComponent(params.searchValue)} /> : ''}
                    {params.category === 'projects' ? <SearchProjectsRenderer searchValue={decodeURIComponent(params.searchValue)} /> : ''}
                    {params.category === 'users' ? <SearchUsersRenderer searchValue={decodeURIComponent(params.searchValue)} /> : ''}
                </div>
            </PageDiv>
        </Layout>
    );
}

export default Search;
