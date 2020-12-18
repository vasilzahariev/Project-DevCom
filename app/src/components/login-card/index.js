import styles from './index.module.css';
import CardForm from '../card-form';
import Input from '../input';
import { useState, useContext } from 'react';
import SubmitBtn from '../submit-btn';
import InputFieldsDiv from '../input-fiels-div';
import HeaderLink from '../header-link';
import ConfigContext from '../../ConfigContext';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';

const LoginCard = () => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const usernameValidation = val => {
        if (val.length < 1)
            setUsernameErr('Username must be at least 1 character long');
        else
            setUsernameErr('');
    }

    const onUsernameChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        usernameValidation(val);
        setUsername(val);
    }

    const passwordValidation = val => {
        if (val.length < 6)
            setPasswordErr('Password must be at least 6 characters long');
        else
            setPasswordErr('');
    }

    const onPasswordChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        passwordValidation(val);
        setPassword(val);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        usernameValidation(username);
        passwordValidation(password);

        if (usernameErr || passwordErr || username.length === 0 || password.length === 0)
            return;
        
        const body = {
            username,
            password
        }

        const promise = await fetch(`${configContext.restApiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.error) {
            if (String(response.error).includes('username')) {
                setUsernameErr(response.error);
                
                return;
            } else if (String(response.error).includes('password')) {
                setPasswordErr(response.error);

                return;
            }
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
                <Input label='Username' value={username} onChange={onUsernameChange} err={usernameErr} />
                <Input label='Password' type='password' value={password} onChange={onPasswordChange} err={passwordErr} />
            </InputFieldsDiv>
            <SubmitBtn>Log in</SubmitBtn>
            <p>Don't have an account? <HeaderLink to='/auth/register'>Register</HeaderLink></p>
        </CardForm>
    )
}

export default LoginCard;
