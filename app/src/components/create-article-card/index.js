import styles from './index.module.css';
import CardForm from '../card-form';
import Input from '../input';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SubmitBtn from '../submit-btn';
import EpicProgrammer from '../epic-programmer';
import { Grid, Popper } from '@material-ui/core';
import TextArea from '../text-area';
import ArticleContext from '../../contexts/ArticleContext';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import SpecialTextArea from '../special-text-area';
import PageDiv from '../page-div';

const CreateArticleCard = () => {
    const articleContext = useContext(ArticleContext);
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [title, setTitle] = useState(articleContext.article.title);
    const [titleErr, setTitleErr] = useState(articleContext.articleErr.titleErr);

    const [path, setPath] = useState(articleContext.article.path);
    const [pathErr, setPathErr] = useState(articleContext.articleErr.pathErr);

    const [content, setContent] = useState(articleContext.article.content);

    const [tags, setTags] = useState(articleContext.article.tags);

    const onTitleChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setTitleErr('Title should be at least 1 character long');
        else
            setTitleErr('');

        setTitle(val);
        articleContext.article.title = val;
    }

    const onPathChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0)
            setPathErr('Path should be at least 1 character long');
        else
            setPathErr('');

        setPath(val);
        articleContext.article.path = val;
    }

    const onContentChange = val => {
        setContent(val);
        articleContext.article.content = val;
    }

    const onTagsChange = e => {
        e.preventDefault();

        const val = e.target.value;

        setTags(val);
        articleContext.article.tags = val;
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (titleErr || pathErr) return;
        else if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            return;
        } else if (path.length === 0) {
            setPathErr('Path should be at least 1 character long');

            return;
        }

        const tagsArr = [...tags.matchAll(/#[\w]+/g)].map(elem => {
            if (elem[0]) return elem[0].substring(1);
        });

        const btnValue = e.nativeEvent.submitter.value;

        const body = {
            authorId: userContext.user._id,
            title,
            path,
            coverImageUrl: 'http://localhost:3000/logo512.png', //TODO: Change
            content: articleContext.article.content,
            isDraft: btnValue === 'Publish' ? false : true,
            tags: tagsArr
        }

        const promise = await fetch(`${configContext.restApiUrl}/news/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await promise.json();

        if (response.error === '500') {
            // TODO: Idk do something

            return;
        } else if (String(response.error).toLowerCase().includes('title')) {
            setTitleErr(response.error);

            return;
        } else if (String(response.error).toLowerCase().includes('path')) {
            setPathErr(response.error);

            return;
        }

        history.push(`/news/${path}`);
    }

    return (
        <PageDiv>
            <div>
                <CardForm onSubmit={onSubmit} big={true}>
                    <Input label='Title' value={title} err={titleErr} onChange={onTitleChange} />
                    <Input label='Path' value={path} err={pathErr} onChange={onPathChange} placeholder='Result: http://link.com/{path}' />
                    { /* <TextArea label='Article Content' value={content} err={contentErr} onChange={onContentChange} /> */}
                    <SpecialTextArea label='Content' onChange={onContentChange} value={content} />
                    <Input label='Tags' value={tags} onChange={onTagsChange} placeholder={`Tags must start with '#'`} />
                    <br />
                    <div>
                        <div className={styles.btn}>
                            <SubmitBtn>Save</SubmitBtn>
                        </div>
                        <div className={styles.btn}>
                            <SubmitBtn>Publish</SubmitBtn>
                        </div>
                    </div>
                </CardForm>
            </div>
        </PageDiv>
    );
}

export default CreateArticleCard;
