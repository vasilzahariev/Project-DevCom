import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import Input from '../input';
import ImageInput from '../image-input';
import SpecialTextArea from '../special-text-area';
import SubmitBtn from '../submit-btn';
import { useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const EditArticleDialog = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [title, setTitle] = useState(props.article.title);
    const [titleErr, setTitleErr] = useState('');

    const [path, setPath] = useState(props.article.path);
    const [pathErr, setPathErr] = useState('');

    const [coverImageUrl, setCoverImageUrl] = useState(props.article.coverImageUrl);
    const [coverImageUrlErr, setCoverImageUrlErr] = useState('');

    const [content, setContent] = useState(props.article.content);

    const onTitleChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setTitleErr('Title should be at least 1 character long');
        else
            setTitleErr('');

        setTitle(val);
    }

    const onPathChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setPathErr('Path should be at least 1 character long');
        else
            setPathErr('');

        setPath(val);
    }

    const onCoverImgUrlChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');
        } else if (!val.startsWith('http://') && !val.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');
        } else setCoverImageUrlErr('');

        setCoverImageUrl(val);
    }

    const onCoverImgUrlChangeWithVal = val => {
        if (val.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');
        } else if (!val.startsWith('http://') && !val.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');
        } else setCoverImageUrlErr('');

        setCoverImageUrl(val);
    }

    const close = e => {
        props.setOpen(false);
    }

    const save = async e => {
        e.preventDefault();

        if (titleErr || pathErr || coverImageUrlErr) return;
        else if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            return;
        } else if (path.length === 0) {
            setPathErr('Path should be at least 1 character long');

            return;
        } else if (coverImageUrl.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');

            return;
        } else if (!coverImageUrl.startsWith('http://') && !coverImageUrl.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');

            return;
        }

        const body = {
            id: props.article._id,
            title,
            path,
            coverImageUrl,
            content,
        }

        const promise = await fetch(`${configContext.restApiUrl}/news/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.error === '505') {
            history.push('/500');

            return;
        } else if (String(response.error).toLowerCase().includes('title')) {
            setTitleErr(response.error);

            return;
        } else if (String(response.error).toLowerCase().includes('path')) {
            setPathErr(response.error);

            return;
        }

        close();

        history.push(`/news/${response.path}`);
    }

    const updateBody = (body) => {
        setContent(body);
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} title='Edit an Article' actionName='Save' action={save}>
            <Input label='Title' value={title} err={titleErr} onChange={onTitleChange} />
            <Input label='Path' value={path} err={pathErr} onChange={onPathChange} placeholder='Result: http://link.com/{path}' />
            <Input label='Cover Image Url' value={coverImageUrl} err={coverImageUrlErr} onChange={onCoverImgUrlChange} placeholder='Cover Image Url' />
            <ImageInput setUrl={onCoverImgUrlChangeWithVal} />
            <SpecialTextArea label='Content' updateBody={updateBody} value={content} />
            <br />
        </DialogWindow>
    );
}

export default EditArticleDialog;
