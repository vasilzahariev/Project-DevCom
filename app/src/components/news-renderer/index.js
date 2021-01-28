import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import NewsCard from '../news-card';

const NewsRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.news.map((article, index) => {
            return (
                <NewsCard key={article._id} index={index} article={article} />
            )
        })
    }, [props.news]);

    return (
        <div>
            <br />
            <Grid container direction='column' justify='space-evenly' alignItems='center'>
                {renderer}
            </Grid>
        </div>
    );
}

export default NewsRenderer;
