import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import SubmitBtn from '../submit-btn';
import { useHistory } from 'react-router-dom';
import ConfigContext from '../../contexts/ConfigContext';
import { useContext, useState } from 'react';
import HeaderLink from '../header-link';
import EditArticleDialog from '../edit-article-dialog';

const ArticleRow = props => {
    const configContext = useContext(ConfigContext);

    const publishedDate = new Date(Date.parse(`${props.article.publishedDate}`));
    const lastEditedDate = new Date(Date.parse(`${props.article.lastEditedDate}`));

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    const onViewClick = e => {
        history.push(`/news/${props.article.path}`);
    }

    const onEditClick = e => {
        setEditOpen(true);
    }

    const onPublishClick = async e => {
        if (!window.confirm(`Are you sure you want to publish article with title: "${props.article.title}"?`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/news/publish/${props.article._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
    }

    const onDeleteClick = async e => {
        if (!window.confirm(`Are you sure you want to delete article with title: "${props.article.title}"?`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/news/delete/${props.article._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/500');
    }

    return (
        <Grid className={styles.row} item xs={12}>
            <Grid container>
                <Grid className={styles.value} item xs={1}>{props.index}</Grid>
                <Grid className={styles.value} item xs={props.showUser ? 2 : 3}>{props.article.title}</Grid>
                <Grid className={styles.value} item xs={props.showUser ? 1 : 2}>{props.article.path}</Grid>
                {props.showUser ? <Grid className={styles.value} item xs={2}><HeaderLink to={`/u/${props.article.author.username}`}>{props.article.author.username}</HeaderLink></Grid> : ''}
                <Grid className={styles.value} item xs={1}>{props.article.isDraft ? 'Draft' : 'Published'}</Grid>
                <Grid className={styles.value} item xs={1}>{props.article.isDraft ? '-' : publishedDate.toLocaleDateString()}</Grid>
                <Grid className={styles.value} item xs={1}>{!props.article.isDraft && props.article.publishedDate !== props.article.lastEditedDate ? lastEditedDate.toLocaleDateString() : '-'}</Grid>
                <Grid className={styles.value} item xs={3}>
                    <div className={styles.btn}>
                        <SubmitBtn color='blue' onClick={onViewClick}>View</SubmitBtn>
                    </div>
                    <div className={styles.btn}>
                        <SubmitBtn color='yellow' onClick={onEditClick}>Edit</SubmitBtn>
                        {editOpen ? <EditArticleDialog open={editOpen} setOpen={setEditOpen} article={props.article} /> : ''}
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
