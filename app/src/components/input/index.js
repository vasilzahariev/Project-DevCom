import styles from './index.module.css';
import InputErrorMessage from '../input-error-message';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import ShowHideBtn from '../show-hide-btn';

/*
Props:
label
type (default = 'text')
value
onChange
placeholder
err
*/
const Input = (props) => {
    const [showPass, setShowPass] = useState(false);

    const type = props.type ? (props.type === 'password' ? (showPass ? 'text' : 'password') : props.type) : 'text';
    const styleClasses = `${styles.input} ${props.err ? styles.errInputField : styles.clearInputField} ${props.type === 'password' ? styles.password : styles.text}`;
    const placeholder = props.placeholder ? props.placeholder : props.label;

    const onClickshowPass = (e) => {
        e.preventDefault();

        setShowPass(!showPass);
    }

    return (
        <div>
            <label>
                <p className={styles.label}>{props.label}</p>
                <div>
                    <input className={styleClasses} type={type} value={props.value} onChange={props.onChange} placeholder={placeholder} />
                    {props.type === 'password' ? <ShowHideBtn showPass={showPass} onClickshowPass={onClickshowPass} /> : ''}
                </div>
                {props.err ? <InputErrorMessage message={props.err} /> : ''}
            </label>
        </div>
    );
}

export default Input;
