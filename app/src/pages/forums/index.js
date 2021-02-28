import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import SimpleTextBtn from '../../components/simple-text-btn';
import { Grid } from '@material-ui/core';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import CreateCommunityDialog from '../../components/create-community-dialog';
import SubmitBtn from '../../components/submit-btn';
import ForumsFeed from '../../components/forums-feed';
import HeaderLink from '../../components/header-link';
import BrowseCommmunities from '../../components/browse-communities';

const Forums = () => {
    const userContext = useContext(UserContext);

    const [createOpen, setCreateOpen] = useState(false);
    const [browseOpen, setBrowseOpen] = useState(false);

    return (
        <Layout>
            <Grid style={{ marginTop: '3%' }} container alignItems='flex-start'>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    {userContext.user.loggedIn ? <ForumsFeed /> : <p><HeaderLink to='/auth/login'>Login</HeaderLink> to acess Forums Feed</p>}
                </Grid>
                <Grid item xs={4}>
                    <div style={{ marginBottom: '1%' }}>
                    </div>
                    <Grid container justify='center' alignItems='center' spacing={2}>
                        <Grid item xs={12}>
                            <SubmitBtn onClick={() => { setBrowseOpen(true) }}>Browse Communities</SubmitBtn>
                            {browseOpen ? <BrowseCommmunities open={browseOpen} setOpen={setBrowseOpen} /> : ''}
                        </Grid>
                        <Grid item xs={12}>
                            {userContext.user.loggedIn ? <SubmitBtn color='blue' onClick={() => setCreateOpen(true)}>Create a Community</SubmitBtn> : ''}
                            {userContext.user.loggedIn ? <CreateCommunityDialog open={createOpen} setOpen={setCreateOpen} /> : ''}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Forums;
