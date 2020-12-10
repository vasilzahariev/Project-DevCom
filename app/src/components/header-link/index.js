import styles from './index.module.css';
import { Link } from 'react-router-dom';

const HeaderLink = (props) => {
    return (
        <Link className={styles.link} to={props.to}>{props.children}</Link>
    );
}

export default HeaderLink;
