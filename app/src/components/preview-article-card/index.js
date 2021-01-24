import styles from './index.module.css';
import { useContext, useEffect } from 'react';
import ArticleContext from '../../contexts/ArticleContext';

const PreviewArticleCard = () => {
    const articleContext = useContext(ArticleContext);
    const title = articleContext.article.title;
    const body = articleContext.article.content;

    useEffect(() => {
        document.getElementById('headerDiv').innerHTML = `<h1>${title}</h1><hr/>` + document.getElementById('headerDiv').innerHTML;
        document.getElementById('bodyDiv').innerHTML += body;
    }, [])

    return (
        <div id='headerDiv'>
            <div id='bodyDiv' className={styles.bodyDiv}>
            </div>
        </div>
    );
}

export default PreviewArticleCard;
