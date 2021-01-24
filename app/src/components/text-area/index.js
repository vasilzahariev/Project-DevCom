import styles from './index.module.css';
import InputErrorMessage from '../input-error-message';

const TextArea = (props) => {
    return (
        <div>
            <label>
                <p>{props.label}</p>
                <div>
                    <textarea className={styles.textarea} placeholder='Content' onChange={props.onChange}>{props.value}</textarea>
                </div>
                {props.err ? <InputErrorMessage message={props.err} /> : ''}
            </label>
        </div>
    );
}

export default TextArea;
