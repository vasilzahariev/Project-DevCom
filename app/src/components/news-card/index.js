import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import HeaderLink from '../header-link';

const NewsCard = (props) => {
    return (
        <Grid item xs={12}>
            <HeaderLink to={`/news/${props.article.path}`}>
                <Grid className={styles.card} container direction='row' justify='flex-start' alignItems='center'>
                    <Grid item xs={6}>
                        <img className={styles.img} src={props.article.coverImageUrl} alt='Cover Image Url' />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <span className={styles.title}>{props.article.title}</span>
                    </Grid>
                </Grid>
            </HeaderLink>
        </Grid>
    );
}

export default NewsCard;
