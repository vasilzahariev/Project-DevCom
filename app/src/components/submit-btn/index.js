import styles from './index.module.css';

const SubmitBtn = (props) => {
    const getColor = () => {
        if (props.color === 'red') return styles.red;
        else if (props.color === 'green') return styles.green;
        else if (props.color === 'yellow') return styles.yellow;
        else if (props.color === 'blue') return styles.blue;
        else return styles.purple;
    }

    return (
        <button className={`${getColor()} ${styles.btn}`} style={{ borderRadius: props.borderRadius ? props.borderRadius : '10px', padding: props.padding ? props.padding : '2% 2.5%', fontSize: props.fontSize ? props.fontSize : '1.2rem' }} title={props.title} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default SubmitBtn;
