import styles from './index.module.css';

const SubmitBtn = (props) => {
    return (
        <input className={`${props.color === 'red' ? styles.red : styles.purple} ${styles.btn}`} type='submit' value={props.children} />
    );
}

export default SubmitBtn;
