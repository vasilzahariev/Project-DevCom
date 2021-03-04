import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useContext, useState, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import Input from '../input';
import TextArea from '../text-area';
import ForumIcon from '../forum-icon';
import { useHistory } from 'react-router-dom';
import ImageInput from '../image-input';

const CreateCommunityDialog = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [description, setDescription] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [iconUrlErr, setIconUrlErr] = useState('');

    useEffect(() => {
        if (!userContext.user.loggedIn) history.push(`/auth/login`);
    }, [])

    const onNameChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setNameErr(`Name should be at least 1 charater long`);
        } else if (val.match(/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setNameErr(`Any symbol besides '-' is not allowed`);
        } else setNameErr('');

        setName(val);
    }

    const onTitleChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setTitleErr('Title should be at least 1 character long');
        } else {
            setTitleErr('');
        }

        setTitle(val);
    }

    const onDescriptionChange = e => {
        const val = String(e.target.value);

        setDescription(val);
    }

    const onIconUrlChange = e => {
        const val = String(e.target.value);

        if (val.length !== 0 && !val.startsWith('http://') && !val.startsWith('https://')) {
            setIconUrlErr(`Icon's url should start with either "http://" or "https://"`);
        } else setIconUrlErr('');

        setIconUrl(val);
    }

    const checkForErrs = () => {
        let areThereErrs = false;

        if (name.length === 0) {
            setNameErr(`Name should be at least 1 charater long`);

            areThereErrs = true;
        } else if (name.match(/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setNameErr(`Any symbol besides '-' is not allowed`);

            areThereErrs = true;
        }

        if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            areThereErrs = true;
        }

        if (iconUrl.length !== 0 && !iconUrl.startsWith('http://') && !iconUrl.startsWith('https://')) {
            setIconUrlErr(`Icon's url should start with either "http://" or "https://"`);

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const close = () => {
        props.setOpen(false);
        setName('');
        setNameErr('');
        setTitle('');
        setTitleErr('');
        setDescription('');
        setIconUrl('');
        setIconUrlErr('');
    }

    const create = async e => {
        if (checkForErrs()) return;

        const body = {
            ownerId: userContext.user._id,
            name,
            title,
            description,
            iconUrl
        }

        const promise = await fetch(`${configContext.restApiUrl}/forum/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status && response.err) {
            setNameErr(response.err);

            return;
        } else if (!response.status) {
            history.push('/500');
        } else {
            history.push(`/forum/f/${response.name}`);
        }

        close();
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Create a Community' action={create} actionName='Create'>
            <Input label={<p>Name<br /> Used for the url. Do not use any spaces or symbols besides '-'</p>} placeholder={`Name`} value={name} onChange={onNameChange} err={nameErr} />
            <Input label='Title' placeholder='Title' value={title} onChange={onTitleChange} err={titleErr} />
            <TextArea label='Description' placeholder='Description' value={description} onChange={onDescriptionChange} height={200} />
            <Input label='Icon Url' placeholder='Icon Url' value={iconUrl} onChange={onIconUrlChange} err={iconUrlErr} />
            <ImageInput setUrl={url => { setIconUrl(url) }} />
            <div style={{ marginTop: '2.5%' }}>
                <ForumIcon iconUrl={iconUrl} />
            </div>
        </DialogWindow>
    );
}

export default CreateCommunityDialog;
