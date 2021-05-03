import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import NewsCard from '../news-card';
import { useMediaQuery } from 'react-responsive';

const NewsRenderer = (props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const sortNews = (a, b) => {
        const date1 = new Date(Date.parse(a.publishedDate));
        const date2 = new Date(Date.parse(b.publishedDate));

        if (date1 > date2) return -1;
        else if (date1 < date2) return 1;

        return 0;
    }

    const renderer = useMemo(() => {
        return props.news.sort(sortNews).map((article, index) => {
            return (
                <NewsCard key={article._id} index={index} article={article} />
            )
        })
    }, [props.news]);

    return (
        <div style={{ width: isMobile ? '90%' : '50%', margin: '0 auto' }}>
            <br />
            <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
                {renderer}
            </Grid>
        </div>
    );
}

export default NewsRenderer;
