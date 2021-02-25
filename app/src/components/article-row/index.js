import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';

const ArticleRow = props => {
    const publishedDate = new Date(Date.parse(`${props.article.publishedDate}`));
    const lastEditedDate = new Date(Date.parse(`${props.article.lastEditedDate}`));

    const history = useHistory();

    const onViewClick = e => {
        history.push(`/news/${props.article.path}`);
    }

    const onEditClick = e => {
        history.push(`/news/edit/${props.article.path}`);
    }

    const onPublishClick = e => {

    }

    const onDeleteClick = e => {
        
    }

    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container>
                <Grid className={styles.value} item xs={1}>{props.index}</Grid>
                <Grid className={styles.value} item xs={2}>{props.article.title}</Grid>
                <Grid className={styles.value} item xs={2}>{props.article.path}</Grid>
                <Grid className={styles.value} item xs={1}>{props.article.isDraft ? 'Draft' : 'Published'}</Grid>
                <Grid className={styles.value} item xs={1}>{props.article.isDraft ? '-' : publishedDate.toLocaleDateString()}</Grid>
                <Grid className={styles.value} item xs={1}>{!props.article.isDraft && props.article.publishedDate !== props.article.lastEditedDate ? lastEditedDate.toLocaleDateString() : '-'}</Grid>
                <Grid className={styles.value} item xs={4}>
                    <div className={styles.btn}>
                        <SubmitBtn color='blue' onClick={onViewClick}>View</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='yellow' onClick={onEditClick}>Edit</SubmitBtn>
                    </div>
                    {props.article.isDraft ?
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

export default ArticleRow;
