import styles from './index.module.css';

const SimpleTextBtn = (props) => {
    return (
        <button className={styles.btn} title={props.title ? props.title : ''} onClick={props.onClick}>
            {props.children}
        </button>
        //<input className={styles.btn} title={props.title ? props.title : ''} type='button' onClick={props.onClick} value={props.children} />
    );
}

export default SimpleTextBtn;
