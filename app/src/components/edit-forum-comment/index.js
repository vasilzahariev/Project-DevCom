import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useContext, useState, useEffect } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import SpecialTextArea from '../special-text-area';

const EditFourmComment = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [comment, setComment] = useState(props.comment.content);
    const [commentErr, setCommentErr] = useState('');

    const onCommentChange = body => {
        if (body.length === 0) {
            setCommentErr('Comment should be at least 1 character long');
        } else setCommentErr('');

        setComment(body);
    }

    const close = () => {
        props.setOpen(false);
        setComment('');
        setCommentErr('');
    }

    const edit = async e => {
        e.preventDefault();

        if (comment.length === 0) {
            setCommentErr('Comment should be at least 1 character long');

            return;
        }

        const body = {
            id: props.comment._id,
            content: comment
        }

        const promise = await fetch(`${configContext.restApiUrl}/forum/editComment`, {
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
            history.push('/505');
        }
    }

    return (
        <div>
            <DialogWindow open={props.open} onClearClose={close} title='Edit a Comment' actionName='Edit' action={edit}>
                <SpecialTextArea label='Comment' placeholder='Comment' value={comment} updateBody={onCommentChange} err={commentErr} />
            </DialogWindow>
        </div>
    );
}

export default EditFourmComment;
