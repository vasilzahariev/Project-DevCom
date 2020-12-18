import styles from './index.module.css';

const ShowHideBtn = (props) => {
    return (
        <input className={styles.passBtn} type='button' value={props.showPass ? ' Hide ' : 'Show'} onClick={props.onClickshowPass} />
    );
}

export default ShowHideBtn;
