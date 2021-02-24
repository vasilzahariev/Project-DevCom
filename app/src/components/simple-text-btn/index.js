import styles from './index.module.css';

const SimpleTextBtn = (props) => {
    const getColor = () => {
        if (props.color === 'red') return styles.red;
        else if (props.color === 'green') return styles.green;
        else if (props.color === 'yellow') return styles.yellow;
        else if (props.color === 'purple') return styles.purple;
        else return styles.blue;
    }

    return (
        <button className={`${getColor()} ${styles.btn}`} title={props.title ? props.title : ''} onClick={props.onClick}>
            {props.children}
        </button>
        //<input className={styles.btn} title={props.title ? props.title : ''} type='button' onClick={props.onClick} value={props.children} />
    );
}

export default SimpleTextBtn;
