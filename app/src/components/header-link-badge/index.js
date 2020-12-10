import styles from './index.module.css';
import { Link } from 'react-router-dom';
import HeaderLink from '../header-link';
import { Badge } from '@material-ui/core';

const HeaderLinkBadge = (props) => {
    return (
        <Link className={styles.badge} to={props.to}>
            <Badge badgeContent={props.badgeContent} color='primary'>
                <props.icon style={{ fontSize: 25 }} />
            </Badge>
        </Link>
    );
}

export default HeaderLinkBadge;
