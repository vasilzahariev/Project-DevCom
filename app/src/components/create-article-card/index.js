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
import ImageInput from '../image-input';

const CreateArticleCard = () => {
    const articleContext = useContext(ArticleContext);
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const history = useHistory();

    const [title, setTitle] = useState(articleContext.article.title);
    const [titleErr, setTitleErr] = useState(articleContext.articleErr.titleErr);

    const [path, setPath] = useState(articleContext.article.path);
    const [pathErr, setPathErr] = useState(articleContext.articleErr.pathErr);

    const [coverImageUrl, setCoverImageUrl] = useState(articleContext.article.coverImageUrl);
    const [coverImageUrlErr, setCoverImageUrlErr] = useState(articleContext.articleErr.coverImageUrlErr);

    const [content, setContent] = useState(articleContext.article.content);

    const [tags, setTags] = useState(articleContext.article.tags);

    const [isDraft, setDraft] = useState(false);

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

    const onCoverImgUrlChange = e => {
        e.preventDefault();

        const val = String(e.target.value);

        if (val.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');
        } else if (!val.startsWith('http://') && !val.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');
        } else setCoverImageUrlErr('');

        setCoverImageUrl(val);
        articleContext.article.coverImageUrl = val;
    }

    const onCoverImgUrlChangeWithVal = val => {
        if (val.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');
        } else if (!val.startsWith('http://') && !val.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');
        } else setCoverImageUrlErr('');

        setCoverImageUrl(val);
        articleContext.article.coverImageUrl = val;
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

        if (titleErr || pathErr || coverImageUrlErr) return;
        else if (title.length === 0) {
            setTitleErr('Title should be at least 1 character long');

            return;
        } else if (path.length === 0) {
            setPathErr('Path should be at least 1 character long');

            return;
        } else if (coverImageUrl.length === 0) {
            setCoverImageUrlErr('Cover Image Url should be at least 1 character long');

            return;
        } else if (!coverImageUrl.startsWith('http://') && !coverImageUrl.startsWith('https://')) {
            setCoverImageUrlErr('Cover Image Url should start with either "http://" or "https://"');

            return;
        }

        const tagsArr = tags.length === 0 ? [] : [...tags.matchAll(/#[\w]+/g)].map(elem => {
            if (elem[0]) return elem[0].substring(1);
        });

        const body = {
            authorId: userContext.user._id,
            title,
            path,
            coverImageUrl,
            content: articleContext.article.content,
            isDraft,
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
            history.push('/500');

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

    const updateBody = (body) => {
        articleContext.article.content = body;
    }

    return (
        <PageDiv>
            <div>
                <CardForm onSubmit={onSubmit} big={true}>
                    <Input label='Title' value={title} err={titleErr} onChange={onTitleChange} />
                    <Input label='Path' value={path} err={pathErr} onChange={onPathChange} placeholder='Result: http://link.com/{path}' />
                    <Input label='Cover Image Url' value={coverImageUrl} err={coverImageUrlErr} onChange={onCoverImgUrlChange} placeholder='Cover Image Url' />
                    <ImageInput setUrl={onCoverImgUrlChangeWithVal} />
                    <SpecialTextArea label='Content' updateBody={updateBody} value={content} />
                    <Input label='Tags' value={tags} onChange={onTagsChange} placeholder={`Tags must start with '#'`} />
                    <br />
                    <div>
                        <div className={styles.btn}>
                            <SubmitBtn onClick={() => { setDraft(true)}}>Save</SubmitBtn>
                        </div>
                        <div className={styles.btn}>
                            <SubmitBtn onClick={() => { setDraft(false)}}>Publish</SubmitBtn>
                        </div>
                    </div>
                </CardForm>
            </div>
        </PageDiv>
    );
}

export default CreateArticleCard;
