import styles from './index.module.css';
import { Grid, Badge } from '@material-ui/core';
import HeaderUserMenuItem from '../header-user-menu-item';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HeaderUserAvatar from '../header-user-avatar';
import HeaderLinkBadge from '../header-link-badge';

const HeaderUser = () => {
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
                    <HeaderUserMenuItem to='/username'>Profile</HeaderUserMenuItem>
                    <HeaderUserMenuItem to='/settings'>Settings</HeaderUserMenuItem>
                    <HeaderUserMenuItem to='/auth/logout'>Log out</HeaderUserMenuItem>
                </HeaderUserAvatar>
            </Grid>
        </Grid >
    );
}

export default HeaderUser;