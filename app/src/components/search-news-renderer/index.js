import styles from './index.module.css';
import { Grid, CircularProgress } from '@material-ui/core';
import { useState, useMemo, useEffect, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import NewsCard from '../news-card';

const SearchNewsRenderer = props => {
    const configContext = useContext(ConfigContext);

    const [ended, setEnded] = useState(false);
    const [news, setNews] = useState([]);

    const sortNews = (a, b) => {
        const title1 = a.title.toLowerCase();
        const title2 = b.title.toLowerCase();

        if (title1 < title2) return -1;
        else if (title1 > title2) return 1;

        return 0;
    }

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/news/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setNews(response.filter(article => {
                if (article.title.toLowerCase().includes(props.searchValue)) return article;
            }).sort(sortNews));
            setEnded(true);
        });
    }, [news]);

    const renderer = useMemo(() => {
        return news.map((article, index) => {
            return (
                <NewsCard key={article._id} index={index} article={article} />
            );
        });
    }, [news]);

    if (!ended) {
        return (<CircularProgress color='inherit' />);
    }

    return (
        <Grid container direction='column' justify='space-evenly' alignItems='center'>
            {news.length === 0 ? 'No News Articles Found' : renderer}
        </Grid>
    );
}

export default SearchNewsRenderer;
