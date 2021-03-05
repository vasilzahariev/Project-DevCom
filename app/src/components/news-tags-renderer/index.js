import styles from './index.module.css';
import { useMemo } from 'react';
import HeaderLink from '../header-link';

const NewsTagsRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.tags.map((tag, index) => {
            return (
                <div key={tag} index={index} className={styles.link}>
                    <HeaderLink to={`/search/news/${tag}`}>#{tag}</HeaderLink>
                </div>
            );
        })
    }, [props.tags]);

    return (
        <div>
            Tags: {renderer}
        </div>
    );
}

export default NewsTagsRenderer;
