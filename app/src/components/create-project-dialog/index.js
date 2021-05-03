import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../input';
import TextArea from '../text-area';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import SpecialTextArea from '../special-text-area';
import { useMediaQuery } from 'react-responsive';

const CreateProjectDialog = props => {
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const history = useHistory();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [projectUrlErr, setProjectUrlErr] = useState('');
    const [description, setDescription] = useState('');
    const [gitHubUrl, setGitHubUrl] = useState('');
    const [gitHubUrlErr, setGitHubUrlErr] = useState('');

    const onNameChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setNameErr(`Projet's Name should be at least 1 character long`);
        } else setNameErr('');

        setName(val);
    }

    const onProjectUrlChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setProjectUrlErr(`Project's Url should be at least 1 character long`);
        } else if (val.match(/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setProjectUrlErr(`Any symbol besides '-' is not allowed`);
        } else setProjectUrlErr('');

        setProjectUrl(val);
    }

    const onDescriptionChange = body => {
        setDescription(body);
    }

    const onGitHubUrlChange = e => {
        const val = String(e.target.value);

        if (val.startsWith('http://') || val.startsWith('https://')) {
            setGitHubUrlErr('');
        } else {
            setGitHubUrlErr(`Company's Url should either start with 'http://' or 'https://'`)
        }

        setGitHubUrl(val);
    }

    const onClearClose = e => {
        props.setOpen(false);
        setName('');
        setNameErr('');
        setProjectUrl('');
        setProjectUrlErr('');
        setDescription('');
        setGitHubUrl('');
        setGitHubUrlErr('');
    }

    const checkForErrs = e => {
        let areThereErrs = false;


        if (name.length === 0) {
            setNameErr(`Projet's Name should be at least 1 character long`);

            areThereErrs = true;
        }

        if (projectUrl.length === 0) {
            setProjectUrlErr(`Project's Url should be at least 1 character long`);

            areThereErrs = true;
        } else if (projectUrl.match(/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g)) {
            setProjectUrlErr(`Any symbol besides '-' is not allowed`);

            areThereErrs = true;
        }

        if (gitHubUrl.length !== 0 && !(gitHubUrl.startsWith('http://') || gitHubUrl.startsWith('https://'))) {
            setGitHubUrlErr(`Company's Url should either start with 'http://' or 'https://'`);

            areThereErrs = true;
        }

        return areThereErrs;
    }

    const create = async e => {
        e.preventDefault();

        if (checkForErrs()) return;

        const body = {
            ownerId: userContext.user._id,
            name,
            projectUrl,
            description,
            gitHubUrl
        }

        const promise = await fetch(`${configContext.restApiUrl}/project/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (!response.status && response.err) {
            setProjectUrlErr(response.err);
        } else if (!response.status) {
            history.push('/500');
        } else {
            history.push(`/projects/${response.projectUrl}`);
        }
    }

    return (
        <Dialog open={props.open} scroll='paper' fullScreen={isMobile} fullWidth={true} maxWidth='md' onClose={onClearClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={styles.title} id='form-dialog-title'>Create a Project</DialogTitle>
            <DialogContent className={styles.dialog}>
                <Input label='Name' placeholder="Project Name" value={name} onChange={onNameChange} err={nameErr} />
                <Input label='Project Url' placeholder="Project Url" value={projectUrl} onChange={onProjectUrlChange} err={projectUrlErr} />
                <SpecialTextArea label='Description' placeholder='Description' value={description} updateBody={onDescriptionChange} />
                <Input label='GitHub Link' placeholder="GitHub Link" value={gitHubUrl} onChange={onGitHubUrlChange} err={gitHubUrlErr} />
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn2} type='button' onClick={onClearClose} value='Close' />
                <input className={styles.btn2} type='button' onClick={create} value='Create' />
            </DialogActions>
        </Dialog>
    );
}

export default CreateProjectDialog;
