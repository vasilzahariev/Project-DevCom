import styles from './index.module.css';
import HeaderLink from '../header-link';

const NewsReplyCard = (props) => {
    return (
        <div className={styles.card}>
            <HeaderLink to={`/${props.reply.username}`}>{props.reply.username}</HeaderLink>
            <div className={styles.reply}>
                <span>{props.reply.content}</span>
            </div>
        </div>
    );
}

export default NewsReplyCard;
