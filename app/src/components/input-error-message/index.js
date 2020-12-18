import styles from './index.module.css';
import { Input } from '@material-ui/core';

const InputErrorMessage = (props) => {
    return (
        <span className={styles.errMessage}>
            {props.message}
        </span>
    );
}

export default InputErrorMessage;
