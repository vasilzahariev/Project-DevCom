import styles from './index.module.css';
import PageDiv from '../page-div';
import Paper from '@material-ui/core/Paper';
import { Tabs, Tab } from '@material-ui/core';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import FeedData from '../feed-data';
import JobsTable from '../jobs-table';
import ArticlesTable from '../articles-table';
import DevlogsTalbe from '../devlogs-table';
import ForumsPostsTable from '../forums-posts-table'
import { useMediaQuery } from 'react-responsive';

const Dashboard = props => {
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const [tab, setTab] = useState(0);

    const onTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <PageDiv>
            {isMobile ?
                <h2>Dashboard is only available on PC</h2>
                :
                <div>
                    <Tabs value={tab} onChange={onTabChange} indicatorColor="primary" textColor='inherit' centered>
                        <Tab label='Forum' />
                        <Tab label='Jobs' />
                        <Tab label='Devlogs' />
                        {userContext.user.isJournalist || userContext.user.isAdmin ? <Tab label='News Articles' /> : ''}
                    </Tabs>

                    <div className={styles.marginTop}>
                        {tab === 0 ? <ForumsPostsTable username={props.username} /> : ''}
                        {tab === 1 ? <JobsTable username={props.username} /> : ''}
                        {tab === 2 ? <DevlogsTalbe username={props.username} /> : ''}
                        {tab === 3 ? <ArticlesTable username={props.username} /> : ''}
                    </div>
                </div>
            }

        </PageDiv>
    );
};

export default Dashboard;
