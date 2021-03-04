import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useState, useEffect, useContext } from 'react';
import SpecialTextArea from '../special-text-area';
import Input from '../input';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory, Redirect } from 'react-router-dom';

const EditProjectDialog = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [projectUrlErr, setProjectUrlErr] = useState('');
    const [description, setDescription] = useState('');
    const [gitHubUrl, setGitHubUrl] = useState('');
    const [gitHubUrlErr, setGitHubUrlErr] = useState('');

    useEffect(() => {
        setName(props.project.name);
        setProjectUrl(props.project.projectUrl);
        setDescription(props.project.description);
        setGitHubUrl(props.project.gitHubUrl);
    }, [props.open]);

    const onNameChange = e => {
        const val = String(e.target.value);

        if (val.length === 0) {
            setNameErr(`Projet's Name should be at least 1 character long`);
        } else setNameErr('');

        setName(val);
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

    const edit = async e => {
        if (checkForErrs()) return;

        const body = {
            name,
            projectUrl,
            description,
            gitHubUrl
        }

        const promise = await fetch(`${configContext.restApiUrl}/project/p/${props.project._id}/edit`, {
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
            onClearClose();

            // history.push(`/projects/${response.url}`)
        }
    }

    return (
        <DialogWindow open={props.open} onClearClose={onClearClose} action={edit} title={'Edit Project'} actionName={'Edit'}>
            <Input label='Name' placeholder="Project Name" value={name} onChange={onNameChange} err={nameErr} />
            <SpecialTextArea label='Description' placeholder='Description' value={description} updateBody={onDescriptionChange} />
            <Input label='GitHub Link' placeholder="GitHub Link" value={gitHubUrl} onChange={onGitHubUrlChange} err={gitHubUrlErr} />
        </DialogWindow>
    );
}

export default EditProjectDialog;
