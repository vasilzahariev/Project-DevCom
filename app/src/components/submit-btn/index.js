import styles from './index.module.css';

const SubmitBtn = (props) => {
    return (
        <input className={styles.btn} type='submit' value={props.children} />
    );
}

export default SubmitBtn;
