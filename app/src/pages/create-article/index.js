import styles from './index.module.css';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import CreateArticleCard from '../../components/create-article-card';
import { useState, cloneElement, useEffect } from 'react';
import ArticleContext from '../../contexts/ArticleContext';
import PreviewArticleCard from '../../components/preview-article-card';

const CreateArticle = () => {
    const [isEdit, setIsEdit] = useState(true);
    const [article, setArticle] = useState({ title: '', path: '', content: '' });
    const [articleErr, setArticleErr] = useState({ titleErr: '', path: '', content: '' });

    const onEditClick = e => {
        e.preventDefault();

        setIsEdit(true);
    }

    const onPreviewClick = e => {
        e.preventDefault();

        setIsEdit(false);
    }

    return (
        <Layout>
            <ArticleContext.Provider value={{ article: article, articleErr: articleErr }}>
                <PageDiv>
                    <h1>Write an article</h1>
                    <div className={styles.btns}>
                        <input className={`${styles.btn} ${isEdit ? styles.currentTab : ''}`} type='submit' onClick={onEditClick} value='Edit' />
                        <input className={`${styles.btn} ${!isEdit ? styles.currentTab : ''}`} type='submit' onClick={onPreviewClick} value='Preview' />
                    </div>
                </PageDiv>
                {isEdit ? <CreateArticleCard /> : <PreviewArticleCard />}
            </ArticleContext.Provider>
        </Layout>
    );
}

export default CreateArticle;
