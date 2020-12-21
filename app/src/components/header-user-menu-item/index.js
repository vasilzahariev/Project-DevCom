import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { MenuItem } from '@material-ui/core';

const HeaderUserMenuItem = (props) => {
    const history = useHistory();

    const onClick = (e) => {
        e.preventDefault();

        history.push(props.to);
    }

    return (
        <MenuItem onClick={props.onClick ? props.onClick : onClick}>{props.children}</MenuItem>
    );
}

export default HeaderUserMenuItem;
