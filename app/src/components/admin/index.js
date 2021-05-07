import styles from './index.module.css';
import Layout from '../layout';
import PageDiv from '../page-div';
import { Tabs, Tab, Fade, Collapse } from '@material-ui/core';
import { useState } from 'react';
import ArticlesTable from '../articles-table';
import JobsTable from '../jobs-table';
import DevlogsTalbe from '../devlogs-table';
import ProjectsTable from '../projects-table';
import ForumsTable from '../forums-table';
import ForumsPostsTable from '../forums-posts-table';
import UsersTable from '../users-table';
import { useMediaQuery } from 'react-responsive';

const Admin = () => {
    const [tab, setTab] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const onTabChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Layout>
            {isMobile ?
                <h2>Admin Panel is only available on PC</h2>
                :
                <div style={{ margin: '2.5%' }}>
                    <Tabs value={tab} onChange={onTabChange} indicatorColor="primary" textColor='inherit' centered>
                        <Tab label='News Articles' />
                        <Tab label='Forums' />
                        <Tab label='Forum Posts' />
                        <Tab label='Jobs' />
                        <Tab label='Feed Posts' />
                        <Tab label='Projects' />
                        <Tab label='Devlogs' />
                        <Tab label='Users' />
                    </Tabs>

                    <div style={{ marginTop: '2.5%' }}>
                        {tab === 0 ? <ArticlesTable username='' showUser={true} /> : ''}
                        {tab === 1 ? <ForumsTable username='' showUser={true} /> : ''}
                        {tab === 2 ? <ForumsPostsTable username='' /> : ''}
                        {tab === 3 ? <JobsTable username='' showUser={true} /> : ''}
                        {tab === 4 ? 'Feed Posts' : ''}
                        {tab === 5 ? <ProjectsTable /> : ''}
                        {tab === 6 ? <DevlogsTalbe username='' showUser={true} /> : ''}
                        {tab === 7 ? <UsersTable /> : ''}
                    </div>
                </div>}
        </Layout>
    );
}

export default Admin;
