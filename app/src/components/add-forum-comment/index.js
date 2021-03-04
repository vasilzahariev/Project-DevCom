import styles from './index.module.css';
import SpecialTextArea from '../special-text-area';
import SubmitBtn from '../submit-btn';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import ConfigContext from '../../contexts/ConfigContext';
import DialogWindow from '../dialog-window';

const AddForumComment = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [comment, setComment] = useState('');
    const [commentErr, setCommentErr] = useState('');
    const [open, setOpen] = useState(false);

    const onCommentChange = body => {
        if (body.length === 0) {
            setCommentErr('Comment should be at least 1 character long');
        } else setCommentErr('');

        setComment(body);
    }

    const close = () => {
        setOpen(false);
        setComment('');
        setCommentErr('');
    }

    const create = async e => {
        e.preventDefault();

        if (comment.length === 0) {
            setCommentErr('Comment should be at least 1 character long');
            
            return;
        }

        const body = {
            postId: props.postId,
            comment,
            userId: userContext.user._id
        }

        const promise = await fetch(`${configContext.restApiUrl}/forum/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.status) {
            close();
        } else {
            history.push('/500');
        }
    }

    return (
        <div>
            <SubmitBtn fontSize='1.2rem' padding='1% 2%' onClick={() => { setOpen(true) }}>Add a Comment</SubmitBtn>
            <DialogWindow open={open} onClearClose={close} title='Add a Comment' actionName='Add' action={create}>
                <SpecialTextArea label='Comment' placeholder='Comment' value={comment} updateBody={onCommentChange} err={commentErr} />
            </DialogWindow>
        </div>
    );
}

export default AddForumComment;
