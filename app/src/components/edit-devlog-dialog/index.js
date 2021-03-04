import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useState, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import SpecialTextArea from '../special-text-area';
import Input from '../input';

const EditDevlogDialog = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [title, setTitle] = useState(props.devlog.title);
    const [titleErr, setTitleErr] = useState('');
    const [content, setContent] = useState(props.devlog.content);
    const [contentErr, setContentErr] = useState('');

    const onTitleChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) setTitleErr('Title should be at least 1 character long');
        else setTitleErr('');

        setTitle(val);
    }

    const onContentChange = desc => {
        if (desc.length === 0) setContentErr('Content should be at least 1 character long');
        else setContentErr('');

        setContent(desc);
    }

    const checkForErrs = e => {
        let areThereErrs = false;

        if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            areThereErrs = true;
        }

        if (content.length === 0) {
            setContentErr('Content should be at least 1 character long');

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const close = e => {
        props.setOpen(false);
        setTitle('');
        setTitleErr('');
        setContent('');
        setContentErr('');
    }

    const edit = async e => {
        if (checkForErrs()) return;

        const body = {
            id: props.devlog._id,
            title,
            content,
        }

        const promise = await fetch(`${configContext.restApiUrl}/project/devlog/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        if (!response.status) history.push('/500')

        close();
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Edit a Devlog' actionName='Edit' action={edit}>
            <Input label='Title' placeholder='Title' value={title} onChange={onTitleChange} err={titleErr} />
            <SpecialTextArea label='Content' placeholder='Content' updateBody={onContentChange} value={content} err={contentErr} />
        </DialogWindow>
    );
}

export default EditDevlogDialog;
