import { useContext } from 'react';
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

const HeaderUser = () => {
    const userContext = useContext(UserContext);
    const history = useHistory();

    const onLogoutClick = (e) => {
        e.preventDefault();

        userContext.logout();

        history.push('/');
    }

    return (
        <Grid container justify='flex-end' alignItems='center' spacing={3}>
            <Grid item>
                <HeaderLinkBadge to='/messages' icon={ChatBubbleOutlineIcon} badgeContent={4} />
            </Grid>
            <Grid item>
                <HeaderLinkBadge to='/notifications' icon={NotificationsNoneIcon} badgeContent={1000000} />
            </Grid>
            <Grid item>
                <HeaderUserAvatar>
                    {/* TODO: Once proper authentication is added change the link */}
                    <HeaderUserMenuItem to={`/u/${userContext.user.username}`}>Profile</HeaderUserMenuItem>
                    <HeaderUserMenuItem to={`u/${userContext.user.username}/settings`}>Settings</HeaderUserMenuItem>
                    <HeaderUserMenuItem to='/drafts'>Drafts</HeaderUserMenuItem>
                    <HeaderUserMenuItem onClick={onLogoutClick} to='/auth/logout'>Log out</HeaderUserMenuItem>
                </HeaderUserAvatar>
            </Grid>
        </Grid >
    );
}

export default HeaderUser;
