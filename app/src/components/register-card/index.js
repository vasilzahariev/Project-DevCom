import styles from './index.module.css';
import CardForm from '../card-form';
import Register from '../../pages/register';
import Input from '../input';
import { useState, useContext } from 'react';
import SubmitBtn from '../submit-btn';
import HeaderLink from '../header-link';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import InputFieldsDiv from '../input-fiels-div';

const RegisterCard = () => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');

    const [fullName, setFullName] = useState('');
    const [fullNameErr, setFullNameErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const onUsernameChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setUsernameErr(`Username is required!`);
        else if (val.match(/[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setUsernameErr(`Invalid symbols detected`);
        }
        else
            setUsernameErr('');

        setUsername(val);
    }

    const onFullNameChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setFullNameErr(`Full name should be at least 1 character long`);
        else
            setFullNameErr(``);

        setFullName(val);
    }

    const onPasswordChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setPasswordErr('Password is required!')
        else if (val.length < 6)
            setPasswordErr('Password should be at least 6 characters long');
        else if (val.match(/[ `!^*()\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setPasswordErr(`Invalid symbols detected`);
        }
        else
            setPasswordErr('');

        setPassword(val);
    }

    const onEmailChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setEmailErr('Email is required!');
        else if (!val.match(/^(([^<>()\[\]\\\\.,;:\s@"]+(\.[^<>()\[\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
            setEmailErr('Email should be like this: email@domain.com');
        else
            setEmailErr('');

        setEmail(val);
    }

    const checkForErrs = () => {
        let areThereErrs = false;

        if (username.length === 0) {
            setUsernameErr(`Username is required!`);

            areThereErrs = true;
        } else if (username.match(/[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setUsernameErr(`Invalid symbols detected`);

            areThereErrs = true;
        }

        if (fullName.length === 0) {
            setFullNameErr(`Full name should be at least 1 character long`);

            areThereErrs = true;
        }

        if (password.length === 0) {
            setPasswordErr('Password is required!');

            areThereErrs = true;
        } else if (password.length < 6) {
            setPasswordErr('Password should be at least 6 characters long');

            areThereErrs = true;
        }
        else if (password.match(/[ `!^*()\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setPasswordErr(`Invalid symbols detected`);

            areThereErrs = true;
        }

        if (email.length === 0) {
            setEmailErr('Email is required!');

            areThereErrs = true;
        }
        else if (!email.match(/^(([^<>()\[\]\\\\.,;:\s@"]+(\.[^<>()\[\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailErr('Email should be like this: email@domain.com');

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (checkForErrs())
            return;

        const body = {
            username,
            fullName,
            email,
            password
        }

        const promise = await fetch(`${configContext.restApiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.error) {
            console.log(response.error);

            if (String(response.error).toLowerCase().includes('username')) {
                setUsernameErr(response.error);

                return;
            } else if (String(response.error).toLowerCase().includes('email')) {
                setEmailErr(response.error);

                return;
            }

            history.push('/error');

            return;
        } else {
            const cookie = response.token;

            userContext.login(response.user);

            document.cookie = `aid=${cookie}`;

            history.push('/');

            return;
        }
    }

    return (
        <CardForm onSubmit={onSubmit}>
            <InputFieldsDiv>
                <Input label='Username' value={username} onChange={onUsernameChange} err={usernameErr} placeholder='Username' />
                <Input label='Full Name' value={fullName} onChange={onFullNameChange} err={fullNameErr} placeholder='Full Name' />
                <Input label='Email' value={email} onChange={onEmailChange} err={emailErr} type='email' placeholder='Email' />
                <Input label='Password' value={password} onChange={onPasswordChange} err={passwordErr} type='password' placeholder='Passowrd' />
            </InputFieldsDiv>
            <SubmitBtn>Register</SubmitBtn>
            <p>Already have an account? <HeaderLink to='/auth/login'>Log in</HeaderLink></p>
        </CardForm>
    );
}

export default RegisterCard;
