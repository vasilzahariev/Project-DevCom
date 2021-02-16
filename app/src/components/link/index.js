import styles from './index.module.css';

const ALink = (props) => {
    return(
        <a href={props.to} className={styles.link}>{props.children}</a>
    );
}

export default ALink;
