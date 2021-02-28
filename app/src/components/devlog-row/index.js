import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ALink from '../link';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';
import HeaderLink from '../header-link';

const DevlogRow = props => {
    const date = new Date(Date.parse(`${props.devlog.publishedDate}`));

    const history = useHistory();

    const onViewClick = e => {
        history.push(`/projects/${props.devlog.project.projectUrl}/${props.devlog._id}`);
    }

    const onEditClick = e => {
        // TODO
    }

    const onPublishClick = e => {
        /// TODO
    }

    const onDeleteClick = e => {
        /// TODO
    }

    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container>
                <Grid className={styles.value} item xs={1}>{props.index}</Grid>
                <Grid className={styles.value} item xs={3}>{props.devlog.title}</Grid>
                <Grid className={styles.value} item xs={2}><HeaderLink to={`/projects/${props.devlog.project.projectUrl}`}>{props.devlog.project.name}</HeaderLink></Grid>
                <Grid className={styles.value} item xs={1}>{props.devlog.isDraft ? 'Draft' : 'Published'}</Grid>
                <Grid className={styles.value} item xs={1}>{props.devlog.isDraft ? '-' : date.toLocaleDateString()}</Grid>
                <Grid className={styles.value} item xs={4}>
                    <div className={styles.btn}>
                        <SubmitBtn color='blue' onClick={onViewClick}>View</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='yellow' onClick={onEditClick}>Edit</SubmitBtn>
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
