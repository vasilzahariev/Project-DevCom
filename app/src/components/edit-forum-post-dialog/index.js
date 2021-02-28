import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import Input from '../input';
import SpecialTextArea from '../special-text-area';

const EditForumPostDialog = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [coverImageUrlErr, setCoverImageUrlErr] = useState('');
    const [content, setContent] = useState('');
    const [contentErr, setContentErr] = useState('');

    useEffect(() => {
        setTitle(props.post.title);
        setCoverImageUrl(props.post.coverImageUrl);
        setContent(props.post.content);
    }, [props.open]);

    const onTitleChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setTitleErr('Title should be at least 1 character long');
        } else setTitleErr('');

        setTitle(val);
    }

    const onCoverImageUrlChange = e => {
        const val = String(e.target.value);

        if (val.length !== 0 && !val.startsWith('http://') && !val.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://');
        } else setCoverImageUrlErr('');

        setCoverImageUrl(val);
    }

    const onContentChange = val => {
        if (val.length === 0) {
            setContentErr('Content should be at least 1 character long');
        } else setContentErr('');

        setContent(val);
    }

    const close = () => {
        props.setOpen(false);
        setTitle('');
        setTitleErr('');
        setCoverImageUrl('');
        setCoverImageUrlErr('');
        setContent('');
        setContentErr('');
    }

    const checkForErrs = () => {
        let areThereErrs = false;

        if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            areThereErrs = true;
        }

        if (coverImageUrl.length !== 0 && !coverImageUrl.startsWith('http://') && !coverImageUrl.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://');

            areThereErrs = true;
        }

        if (content.length === 0) {
            setContentErr('Content should be at least 1 character long');

            areThereErrs = true;
        }

        return areThereErrs;
    }

    /// TODO: Add ability for image only

    const edit = async e => {
        if (checkForErrs()) return;

        const body = {
            id: props.post._id,
            title,
            coverImageUrl,
            content
        };

        const promise = await fetch(`${configContext.restApiUrl}/forum/editPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');

        //history.push(`/forum/f/${props.forumName}/${response.id}`);

        close();
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title={`Edit a Post for ${props.forumTitle}`} action={edit} actionName='Edit'>
            <Input label='Title' placeholder='Title' value={title} onChange={onTitleChange} err={titleErr} />
            <Input label='Cover Image Url' placeholder='Cover Image Url' value={coverImageUrl} onChange={onCoverImageUrlChange} err={coverImageUrlErr} />
            <SpecialTextArea label='Content' placeholder='Content' value={content} updateBody={onContentChange} err={contentErr} />
        </DialogWindow>
    );
}

export default EditForumPostDialog;
