import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useState, useContext } from 'react';
import SpecialTextArea from '../special-text-area';
import Input from '../input';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


const CreateFeedPostCard = (props) => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const history = useHistory();

    const [content, setContent] = useState('');
    const [contentErr, setContentErr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlErr, setImageUrlErr] = useState('');

    const onContentChange = body => {
        if (String(body).length === 0) setContentErr('Content should be at least 1 character long');
        else setContentErr('');

        setContent(body);
    }

    const onImageUrlChange = e => {
        const val = e.target.value;

        if (val.length === 0 || (val.startsWith('http://') || val.startsWith('https://'))) {
            setImageUrlErr('');
        } else {
            setImageUrlErr(`Company's Url should either start with 'http://' or 'https://'`)
        }

        setImageUrl(val);
    }

    const onClearClose = () => {
        props.setOpen(false);
        setContent('');
        setContentErr('');
        setImageUrl('');
        setImageUrlErr('');
    }

    const checkIfThereAreErrors = () => {
        let areThereErrs = false;

        if (content.length === 0) {
            setContentErr('Content should be at least 1 character long');

            areThereErrs = true;
        }

        if (!(imageUrl.length === 0 || (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')))) {
            setImageUrlErr(`Company's Url should either start with 'http://' or 'https://'`);

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const create = async e => {
        e.preventDefault();

        if (checkIfThereAreErrors()) return;

        const body = {
            content,
            imageUrl,
            username: props.username
        };

        const promise = await fetch(`${configContext.restApiUrl}/feed/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
        else {
            onClearClose();
        }
    }

    return (
        <Dialog open={props.open} scroll='paper' fullScreen={isMobile} fullWidth={true} maxWidth='md' onClose={onClearClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={styles.title} id='form-dialog-title'>Create a Post</DialogTitle>
            <DialogContent className={styles.dialog}>
                <SpecialTextArea label='Content' placeholder='Content' value={content} updateBody={onContentChange} err={contentErr} />
                <Input label='Image URL (not required)' placeholder='Image URL' value={imageUrl} onChange={onImageUrlChange} err={imageUrlErr} />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn2} type='button' onClick={onClearClose} value='Close' />
                <input className={styles.btn2} type='button' onClick={create} value='Add' />
            </DialogActions>
        </Dialog>
    );
}

export default CreateFeedPostCard;
