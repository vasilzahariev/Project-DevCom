import styles from './index.module.css';
import InputErrorMessage from '../input-error-message';

const TextArea = (props) => {
    return (
        <div>
            <label>
                <p>{props.label}</p>
                <div>
                    <textarea style={{ height: `${props.height}px` }} maxLength={props.max} className={styles.textarea} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
                </div>
                {props.err ? <InputErrorMessage message={props.err} /> : ''}
            </label>
        </div>
    );
}

export default TextArea;
