import styles from './index.module.css';
import SubmitBtn from '../submit-btn';

const TableBtn = props => {
    return (
        <div className={styles.btn}>
            <SubmitBtn color={props.color} onClick={props.onClick}>{props.children}</SubmitBtn>
        </div>
    );
}

export default TableBtn;
