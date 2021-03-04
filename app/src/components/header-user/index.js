import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { Grid, Badge } from '@material-ui/core';
import HeaderUserMenuItem from '../header-user-menu-item';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HeaderUserAvatar from '../header-user-avatar';
import HeaderLinkBadge from '../header-link-badge';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';

const HeaderUser = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/chat/getUnreadCount/${userContext.user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setUnreadMessages(response.unreadMessages);
        });
    })

    const onLogoutClick = (e) => {
        e.preventDefault();

        userContext.logout();

        history.push('/');
    }

    return (
        <Grid container justify='flex-end' alignItems='center' spacing={3}>
            <Grid item>
                <HeaderLinkBadge to='/chat' icon={ChatBubbleOutlineIcon} badgeContent={unreadMessages} />
            </Grid>
            <Grid item>
                <HeaderUserAvatar>
                    {/* TODO: Once proper authentication is added change the link */}
                    <HeaderUserMenuItem to={`/u/${userContext.user.username}`}>Profile</HeaderUserMenuItem>
                    <HeaderUserMenuItem to={`/u/${userContext.user.username}/settings`}>Settings</HeaderUserMenuItem>
                    {userContext.user.isAdmin || userContext.user.isOwner ? <HeaderUserMenuItem to='/admin'>Admin</HeaderUserMenuItem> : ''}
                    <HeaderUserMenuItem onClick={onLogoutClick} to='/auth/logout'>Log out</HeaderUserMenuItem>
                </HeaderUserAvatar>
            </Grid>
        </Grid >
    );
}

/*
<Grid item>
                <HeaderLinkBadge to='/notifications' icon={NotificationsNoneIcon} badgeContent={1000000} />
            </Grid>
*/

export default HeaderUser;
