import styles from './index.module.css';

const InputFieldsDiv = (props) => {
    return (
        <div className={styles.inputFields}>
            {props.children}
        </div>
    );
}

export default InputFieldsDiv;
