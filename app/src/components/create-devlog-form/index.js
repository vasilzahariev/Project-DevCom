import styles from './index.module.css';
import CardForm from '../card-form';
import { useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import Input from '../input';
import SpecialTextArea from '../special-text-area';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';

const CreateDevlogForm = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [content, setContent] = useState('');
    const [contentErr, setContentErr] = useState('');
    const [draft, setDraft] = useState(false);

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

    const onSubmit = async e => {
        e.preventDefault();

        if (checkForErrs()) return;

        const body = {
            projectId: props.project._id,
            authorId: userContext.user._id,
            title,
            content,
            isDraft: draft
        };

        const promise = await fetch(`${configContext.restApiUrl}/project/addDevlog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status) {
            history.push('/505');
        } else {
            history.push(`/projects/${props.project.projectUrl}`);
        }
    }

    const back = e => {
        history.push(`/projects/${props.project.projectUrl}`);
    }

    return (
        <CardForm big={true} onSubmit={onSubmit}>
            <Input label='Title' placeholder='Title' value={title} onChange={onTitleChange} err={titleErr} />
            <SpecialTextArea label='Content' placeholder='Content' updateBody={onContentChange} value={content} err={contentErr} />

            <div className={styles.btns}>
                <div className={styles.btn}><SubmitBtn color='red' onClick={back}>Back to Project</SubmitBtn></div>
                <div className={styles.btn}><SubmitBtn onClick={() => { setDraft(true) }}>Save</SubmitBtn></div>
                <div className={styles.btn}><SubmitBtn onClick={() => { setDraft(false) }}>Publish</SubmitBtn></div>
            </div>
        </CardForm>
    );
}

export default CreateDevlogForm;
