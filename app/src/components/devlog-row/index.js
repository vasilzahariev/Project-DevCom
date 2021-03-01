import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ALink from '../link';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';
import HeaderLink from '../header-link';
import { useContext, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import EditDevlogDialog from '../edit-devlog-dialog';

const DevlogRow = props => {
    const configContext = useContext(ConfigContext);

    const date = new Date(Date.parse(`${props.devlog.publishedDate}`));

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    const onViewClick = e => {
        history.push(`/projects/${props.devlog.project.projectUrl}/${props.devlog._id}`);
    }

    const onEditClick = e => {
        setEditOpen(true);
    }

    const onPublishClick = async e => {
        if (!window.confirm(`Are you sure you want to publish devlog with name: "${props.devlog.title}"`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/project/publish/${props.devlog._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    const onDeleteClick = async e => {
        if (!window.confirm(`Are you sure you want to delete devlog with name: "${props.devlog.title}"`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/project/deleteDevlog/${props.devlog._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container>
                <Grid className={styles.value} item xs={1}>{props.index}</Grid>
                <Grid className={styles.value} item xs={props.showUser ? 2 : 3}>{props.devlog.title}</Grid>
                {props.showUser ? <Grid className={styles.value} item xs={1}><HeaderLink to={`/u/${props.devlog.user.username}`}>{props.devlog.user.username}</HeaderLink></Grid> : ''}
                <Grid className={styles.value} item xs={2}><HeaderLink to={`/projects/${props.devlog.project.projectUrl}`}>{props.devlog.project.name}</HeaderLink></Grid>
                <Grid className={styles.value} item xs={1}>{props.devlog.isDraft ? 'Draft' : 'Published'}</Grid>
                <Grid className={styles.value} item xs={1}>{props.devlog.isDraft ? '-' : date.toLocaleDateString()}</Grid>
                <Grid className={styles.value} item xs={4}>
                    <div className={styles.btn}>
                        <SubmitBtn color='blue' onClick={onViewClick}>View</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='yellow' onClick={onEditClick}>Edit</SubmitBtn>
                        {editOpen ? <EditDevlogDialog open={editOpen} setOpen={setEditOpen} devlog={props.devlog} /> : ''}
                    </div>
                    {props.devlog.isDraft ?
                        <div className={styles.btn}>
                            <SubmitBtn color='purple' onClick={onPublishClick}>Publish</SubmitBtn>
                        </div> : ''}
                    <div className={styles.btn}>
                        <SubmitBtn color='red' onClick={onDeleteClick}>Delete</SubmitBtn>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DevlogRow;
