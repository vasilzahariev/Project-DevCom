import styles from './index.module.css';
import CardForm from '../card-form';
import SubmitBtn from '../submit-btn';
import { useState, useEffect, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Input from '../input';
import TextArea from '../text-area'
import ImageInput from '../image-input';

/*
Full Name
Username
Email
Bio
Pfp
Links
*/

const SettingsCard = (props) => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [settings, setSettings] = useState(null);
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameErr, setFullNameErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [bio, setBio] = useState('');
    const [bioErr, setBioErr] = useState('');
    const [pfpUrl, setPfpUrl] = useState('');
    const [gitHubUrl, setGitHubUrl] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [youTubeUrl, setYouTubeUrl] = useState('');
    const [twitterUrl, setТwitterUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/auth/getUserInformation/${props.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) {
                history.push('/500');

                return;
            }

            setSettings(response);
            setUsername(response.user.username);
            setFullName(response.user.fullName);
            setEmail(response.user.email);
            setBio(response.user.bio);
            setPfpUrl(response.user.profilePictureUrl);
            setGitHubUrl(response.userLinks.gitHubUrl);
            setWebsiteUrl(response.userLinks.websiteUrl);
            setLinkedInUrl(response.userLinks.linkedInUrl);
            setYouTubeUrl(response.userLinks.youTubeUrl);
            setТwitterUrl(response.userLinks.twitterUrl);
            setFacebookUrl(response.userLinks.facebookUrl);
            setInstagramUrl(response.userLinks.instagramUrl);
            setEnded(true);
        });
    }, []);

    const onUsernameChange = (e) => {
        e.preventDefault();

        const val = String(e.target.value);

        // TODO: Make sure there are no spaces and other symbols

        if (val.length === 0)
            setUsernameErr(`Username is required!`);
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

    const onBioChange = (e) => {
        const val = e.target.value;

        if (val.length > 400) setBioErr(`Bio's length should be less or equal to 400 characters`);
        else setBioErr('');

        setBio(val);
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

    const onLinkChange = (e, link) => {
        const val = e.target.value;

        switch (link) {
            case 'github': setGitHubUrl(val); break;
            case 'website': setWebsiteUrl(val); break;
            case 'linkedIn': setLinkedInUrl(val); break;
            case 'youtube': setYouTubeUrl(val); break;
            case 'twitter': setТwitterUrl(val); break;
            case 'facebook': setFacebookUrl(val); break;
            case 'instagram': setInstagramUrl(val); break;
            default: break;
        }
    }

    const checkForErrs = () => {
        const areThereErrs = false;

        if (username.length === 0) {
            setUsernameErr(`Username is required!`);

            areThereErrs = true;
        }

        if (fullName.length === 0) {
            setFullNameErr(`Full name should be at least 1 character long`);

            areThereErrs = true;
        }

        if (bio.length > 400) {
            setBioErr(`Bio's length should be less or equal to 400 characters`);

            areThereErrs = true;
        }

        if (email.length === 0) {
            setEmailErr('Email is required!');

            areThereErrs = true;
        } else if (!email.match(/^(([^<>()\[\]\\\\.,;:\s@"]+(\.[^<>()\[\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailErr('Email should be like this: email@domain.com');

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (checkForErrs()) return;

        const body = {
            user: {
                id: settings.user._id,
                username,
                fullName,
                bio,
                email,
                profilePictureUrl: pfpUrl
            },
            userLinks: {
                id: settings.userLinks._id,
                gitHubUrl,
                websiteUrl,
                linkedInUrl,
                youTubeUrl,
                twitterUrl,
                facebookUrl,
                instagramUrl
            }
        }

        const promise = await fetch(`${configContext.restApiUrl}/auth/updateUserInformation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.status) {
            history.push(`/u/${response.username}`);

            return;
        }

        if (String(response.err).toLowerCase().includes('username')) {
            setUsernameErr(response.err);
        } else if (String(response.err).toLowerCase().includes('email')) {
            setEmailErr(response.err);
        } else {
            history.push('/500');
        }
    }

    const onCancelClick = async e => {
        e.preventDefault();

        history.push(`/u/${props.username}`);
    }

    if (!ended) {
        <Backdrop open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return (
        <CardForm big={true}>
            <div>
                <Input label='Username' type='text' value={username} onChange={onUsernameChange} placeholder='Username' err={usernameErr} />
                <Input label='Full Name' type='text' value={fullName} onChange={onFullNameChange} placeholder='Full Name' err={fullNameErr} />
                <Input label='Email' type='email' value={email} onChange={onEmailChange} placeholder='Email' err={emailErr} />
                <div className={styles.bioDiv}>
                    <TextArea label='Bio' placeholder='Bio' onChange={onBioChange} value={bio} height={150} max={400} err={bioErr} />
                </div>
                <Input label='Prifle Picture Url' type='text' value={pfpUrl} onChange={(e) => { setPfpUrl(e.target.value) }} placeholder='Profile Picture Url' />
                <ImageInput setUrl={(url) => { setPfpUrl(url) }} />
                <Input label='GitHub Link' type='text' value={gitHubUrl} onChange={e => onLinkChange(e, 'github')} placeholder='GitHub Link' />
                <Input label='Website Link' type='text' value={websiteUrl} onChange={e => onLinkChange(e, 'website')} placeholder='Website Link' />
                <Input label='LinkedIn Link' type='text' value={linkedInUrl} onChange={e => onLinkChange(e, 'linkedIn')} placeholder='LinkedIn Link' />
                <Input label='Youtube Link' type='text' value={youTubeUrl} onChange={e => onLinkChange(e, 'youtube')} placeholder='Youtube Link' />
                <Input label='Twitter Link' type='text' value={twitterUrl} onChange={e => onLinkChange(e, 'twitter')} placeholder='Twitter Link' />
                <Input label='Facebook Link' type='text' value={facebookUrl} onChange={e => onLinkChange(e, 'facebook')} placeholder='Facebook Link' />
                <Input label='Instagram Link' type='text' value={instagramUrl} onChange={e => onLinkChange(e, 'instagram')} placeholder='Instagram Link' />
            </div>
            <div className={styles.btns}>
                <div className={styles.btn}>
                    <SubmitBtn color='red' onClick={onCancelClick}>Back to profile</SubmitBtn>
                </div>
                <div className={styles.btn}>
                    <SubmitBtn onClick={onSubmit} className={styles.btn}>Save</SubmitBtn>
                </div>
            </div>
        </CardForm>
    );
}

export default SettingsCard;
