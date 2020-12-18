import styles from './index.module.css';

const PageDiv = (props) => {
    return (
        <div className={styles.page}>
            {props.children}
        </div>
    );
}

export default PageDiv;
